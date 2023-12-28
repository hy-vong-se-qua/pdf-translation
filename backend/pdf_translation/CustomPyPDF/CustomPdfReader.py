# Copyright (c) 2006, Mathieu Fenniak
# Copyright (c) 2007, Ashish Kulkarni <kulkarni.ashish@gmail.com>
#
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are
# met:
#
# * Redistributions of source code must retain the above copyright notice,
# this list of conditions and the following disclaimer.
# * Redistributions in binary form must reproduce the above copyright notice,
# this list of conditions and the following disclaimer in the documentation
# and/or other materials provided with the distribution.
# * The name of the author may not be used to endorse or promote products
# derived from this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
# ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
# LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
# CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
# SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
# INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
# CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
# ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.

import os
import re
import struct
import zlib
from datetime import datetime
from io import BytesIO
from pathlib import Path
from typing import (
    Any,
    Callable,
    Dict,
    Iterable,
    List,
    Optional,
    Tuple,
    Union,
    cast,
)

from pypdf._encryption import Encryption, PasswordType
from pypdf._page import PageObject, _VirtualList
from pypdf._utils import (
    StrByteType,
    StreamType,
    b_,
    deprecate_no_replacement,
    deprecate_with_replacement,
    logger_warning,
    read_non_whitespace,
    read_previous_line,
    read_until_whitespace,
    skip_over_comment,
    skip_over_whitespace,
)
from pypdf.constants import CatalogAttributes as CA
from pypdf.constants import CatalogDictionary as CD
from pypdf.constants import CheckboxRadioButtonAttributes
from pypdf.constants import Core as CO
from pypdf.constants import DocumentInformationAttributes as DI
from pypdf.constants import FieldDictionaryAttributes, GoToActionArguments
from pypdf.constants import PageAttributes as PG
from pypdf.constants import PagesAttributes as PA
from pypdf.constants import TrailerKeys as TK
from pypdf.errors import (
    EmptyFileError,
    FileNotDecryptedError,
    PdfReadError,
    PdfStreamError,
    WrongPasswordError,
)
from pypdf.generic import (
    ArrayObject,
    ContentStream,
    DecodedStreamObject,
    Destination,
    DictionaryObject,
    EncodedStreamObject,
    Field,
    FloatObject,
    IndirectObject,
    NameObject,
    NullObject,
    NumberObject,
    PdfObject,
    TextStringObject,
    TreeObject,
    read_object,
)
from pypdf import PdfFileWriter, PdfReader
from pypdf._reader import OutlineType, DocumentInformation, XmpInformation, PagemodeType, convert_to_int
from .CustomPageObject import CustomPageObject

class CustomPdfReader(PdfReader):
    """
    Initialize a PdfReader object.

    This operation can take some time, as the PDF stream's cross-reference
    tables are read into memory.

    :param stream: A File object or an object that supports the standard read
        and seek methods similar to a File object. Could also be a
        string representing a path to a PDF file.
    :param bool strict: Determines whether user should be warned of all
        problems and also causes some correctable problems to be fatal.
        Defaults to ``False``.
    :param None/str/bytes password: Decrypt PDF file at initialization. If the
        password is None, the file will not be decrypted.
        Defaults to ``None``
    """

    @property
    def pages(self) -> List[CustomPageObject]:
        """Read-only property that emulates a list of :py:class:`Page<pypdf._page.Page>` objects."""
        return _VirtualList(self._get_num_pages, self._get_page)  # type: ignore

    def _flatten(
        self,
        pages: Union[None, DictionaryObject, CustomPageObject] = None,
        inherit: Optional[Dict[str, Any]] = None,
        indirect_reference: Optional[IndirectObject] = None,
    ) -> None:
        inheritable_page_attributes = (
            NameObject(PG.RESOURCES),
            NameObject(PG.MEDIABOX),
            NameObject(PG.CROPBOX),
            NameObject(PG.ROTATE),
        )
        if inherit is None:
            inherit = {}
        if pages is None:
            # Fix issue 327: set flattened_pages attribute only for
            # decrypted file
            catalog = self.trailer[TK.ROOT].get_object()
            pages = catalog["/Pages"].get_object()  # type: ignore
            self.flattened_pages = []

        t = "/Pages"
        if PA.TYPE in pages:
            t = pages[PA.TYPE]  # type: ignore

        if t == "/Pages":
            for attr in inheritable_page_attributes:
                if attr in pages:
                    inherit[attr] = pages[attr]
            for page in pages[PA.KIDS]:  # type: ignore
                addt = {}
                if isinstance(page, IndirectObject):
                    addt["indirect_reference"] = page
                self._flatten(page.get_object(), inherit, **addt)
        elif t == "/Page":
            for attr_in, value in list(inherit.items()):
                # if the page has it's own value, it does not inherit the
                # parent's value:
                if attr_in not in pages:
                    pages[attr_in] = value
            page_obj = CustomPageObject(self, indirect_reference)
            page_obj.update(pages)

            self.flattened_pages.append(page_obj)  # type: ignore

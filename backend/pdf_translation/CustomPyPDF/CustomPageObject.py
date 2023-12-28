from pypdf._page import PageObject

import math
import uuid
import warnings
from decimal import Decimal
from typing import (
    Any,
    Callable,
    Dict,
    Iterable,
    Iterator,
    List,
    Optional,
    Set,
    Tuple,
    Union,
    cast,
)

from pypdf._cmap import build_char_map, unknown_char_map
from pypdf._utils import (
    CompressedTransformationMatrix,
    File,
    TransformationMatrixType,
    deprecate_no_replacement,
    deprecate_with_replacement,
    logger_warning,
    matrix_multiply,
)
from pypdf.constants import AnnotationDictionaryAttributes as ADA
from pypdf.constants import ImageAttributes as IA
from pypdf.constants import PageAttributes as PG
from pypdf.constants import Ressources as RES
from pypdf.errors import PageSizeNotDefinedError
from pypdf.filters import _xobj_to_image
from pypdf.generic import (
    ArrayObject,
    ContentStream,
    DictionaryObject,
    EncodedStreamObject,
    FloatObject,
    IndirectObject,
    NameObject,
    NullObject,
    NumberObject,
    RectangleObject,
    TextStringObject,
    encode_pdfdocencoding,
)


class CustomPageObject(PageObject):
    pass

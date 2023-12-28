from django.core.files.base import File
from pyquery import PyQuery
from pdfquery import PDFQuery
from ..CustomPyPDF.CustomPdfReader import CustomPdfReader
from ..CustomPyPDF.CustomFPDF import CustomFPDF
from ..nlp.service.custom_model import CustomModel

SIZE = {
    "A4": {
        "x": 210,
        "y": 297,
    }
}

def children(pdfQuery: PyQuery, pdf: CustomFPDF):
    if pdfQuery is None:
        return
    lst = pdfQuery.getchildren()
    if lst is None or len(lst) == 0:
        if "text" not in pdfQuery.tag.lower():
            return
        text = pdfQuery.text
        if text is None or len(text) == 0:
            return
        x0 = float(pdfQuery.attrib["x0"])
        y0 = float(pdfQuery.attrib["y0"])
        y1 = float(pdfQuery.attrib["y1"])
        pdf.set_font_size(abs(y0 - y1))
        x = x0
        y = 792 - y0
        text = CustomModel.translate_en2vi(text)
        print(text)
        pdf.text(x, y, text)
    for child in pdfQuery.getchildren():
        children(child, pdf)

class PdfFile:
    __file: File
    __fileName: str
    __lang: str

    def __init__(self, file: File, fileName: str, lang: str) -> None:
        self.__file = file
        self.__fileName = fileName
        self.__lang = lang

    def __addPage(pdf: CustomFPDF):
        pdf.add_page()
        pdf.set_font('times', '', 11)  
        pdf.ln(10)
    
    def __addTextToPdf(pdf: CustomFPDF, text: str):
        pdf.write(5, text)

    def scan_pdf(self):
        pdf = CustomFPDF()
        pdf.config()

        # compression is not yet supported in py3k version
        pdfReader = CustomPdfReader(self.__file)
        pagecount = len(pdfReader.pages)

        for p in range(0, pagecount):
            pageObj = pdfReader.pages[p]
            text = pageObj.extract_text()
            PdfFile.__addPage(pdf)
            print("Page %s" % p)
            if text is None or len(text) == 0:
                continue
            if self.__lang == "en":
                raws = " ".join(text.split("\n")).split(".")
            elif self.__lang == "ja":
                raws = "".join(text.split("\n")).split("。")
            preds = []
            for raw in raws:
                pred = CustomModel.translate_en2vi(raw)
                # pred = VinaiTranslate.translate_en2vi(raw)
                preds.append(pred)
                print(pred)
            PdfFile.__addTextToPdf(pdf, ". ".join(preds))
        return pdf.output()

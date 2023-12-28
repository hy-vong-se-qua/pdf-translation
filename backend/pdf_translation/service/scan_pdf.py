from pdfquery import PDFQuery
from lxml import etree
import pandas as pd
import common

name = "The Dip A Little Book That Teaches You When to Quit (and When to Stick)"
pdf = PDFQuery('%s.pdf' % name)
pdf.load()
lst = []

def pdfscrape(pdf: PDFQuery, p):
    # Extract each relevant information individually
    pq = pdf.pq('LTTextLineHorizontal')
    text = pq.text(squash_space=False)
    text = text.replace("  ", "\n")
    lst.append(text)
    # childs = pq.children().items()
    # for child in childs:
    #     print(child.text(squash_space=False))
    # print(pq.children())

pagecount = pdf.doc.catalog['Pages'].resolve()['Count']
# master = pd.DataFrame()
for p in range(pagecount):
    pdf.load(p)
    page = pdfscrape(pdf, p) 
    # master = master.append(page, ignore_index=True)
# pdf.tree.write('patient1xml.xml', pretty_print = True)
common.write_file("./output/%s.txt" % name, "\n".join(lst))
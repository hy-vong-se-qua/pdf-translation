from fpdf import FPDF
from fpdf.py3k import PY3K

class CustomFPDF(FPDF):
    def config(self):
        self.compress = False
        self.add_font('times', '', './static/fonts/times/times.ttf', uni=True) 
        pass

    def output(self):
        "Output PDF to some destination"
        #Finish document if necessary
        if(self.state<3):
            self.close()
        #Save to local file
        if PY3K:
            # manage binary data as latin1 until PEP461 or similar is implemented
            return bytes(self.buffer.encode("latin1"))
        else:
            return bytes(self.buffer)

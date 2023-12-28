from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from django.core.handlers.wsgi import WSGIRequest

from pdf_translation.model.PdfFile import PdfFile
from .model.FileUpload import FileUpload
from django.core.files.base import File

# Create your views here.
def upload_file(request: WSGIRequest):
    if request.method == "POST":
        form = FileUpload(request)
        pdf = PdfFile(form.file, form.fileName, form.lang)
        file_data = pdf.scan_pdf()
        response = HttpResponse(file_data, content_type='application/vnd.ms-excel')
        response['Content-Disposition'] = 'attachment; filename="%s"' % form.fileName
        response = HttpResponse(file_data, content_type='application/pdf')
    return response

def handle_uploaded_file(file: File):
    with open(file.name, "wb+") as destination:
        for chunk in file.chunks():
            destination.write(chunk)

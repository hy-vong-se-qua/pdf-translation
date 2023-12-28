from django.core.files.base import File
from django.core.handlers.wsgi import WSGIRequest

class FileUpload:
    file: File
    fileName: str
    lang: str

    def __init__(self, request: WSGIRequest) -> None:
        self.file = request.FILES["file"]
        self.fileName = request.POST["fileName"]
        self.lang = request.POST["lang"]

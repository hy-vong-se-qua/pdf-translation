from django.urls import path

from . import views, controllers

urlpatterns = [
    path("", views.index, name="index"),
    path("upload-file", controllers.upload_file, name="index"),
]

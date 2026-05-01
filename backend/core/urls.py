from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("agenda.urls")),
    path("usuarios/", include("users.urls")),
]

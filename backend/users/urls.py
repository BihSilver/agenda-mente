from django.urls import path

from . import views

urlpatterns = [
    path("cadastro/", views.cadastro, name="cadastro"),
    path("login/", views.login, name="login"),
    path("recuperar-senha/", views.solicitar_recuperacao_senha, name="recuperar_senha"),
    path("redefinir-senha/", views.redefinir_senha, name="redefinir_senha"),
]

from django.urls import path

from . import views

urlpatterns = [
    path("compromissos/", views.listar_compromissos, name="listar_compromissos"),
    path("compromissos/fixos/", views.criar_compromisso_fixo, name="criar_compromisso_fixo"),
    path("compromissos/gerar-editaveis/", views.gerar_compromissos_editaveis, name="gerar_compromissos_editaveis"),
    path("", views.home, name="home"),
    path("funcionalidades/", views.funcionalidades, name="funcionalidades"),
    path("sobre/", views.sobre, name="sobre"),
    path("contato/", views.contato, name="contato"),
]

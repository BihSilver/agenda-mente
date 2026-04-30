from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import Compromisso

def listar_compromissos(request):
    compromissos = Compromisso.objects.all()
    texto = ", ".join([c.titulo for c in compromissos])
    return HttpResponse(f"Compromissos: {texto}")

from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def funcionalidades(request):
    return render(request, 'funcionalidades.html')

def sobre(request):
    return render(request, 'sobre.html')

def contato(request):
    return render(request, 'contato.html')
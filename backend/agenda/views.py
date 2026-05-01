import json
from datetime import datetime, timedelta

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from .models import Compromisso


def _json_body(request):
    try:
        return json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return {}


def listar_compromissos(request):
    compromissos = Compromisso.objects.all()
    texto = ", ".join([c.titulo for c in compromissos])
    return HttpResponse(f"Compromissos: {texto}")


@csrf_exempt
def criar_compromisso_fixo(request):
    if request.method != "POST":
        return JsonResponse({"erro": "Método não permitido"}, status=405)

    data = _json_body(request)
    compromisso = Compromisso.objects.create(
        user_id=data.get("user_id"),
        titulo=data.get("titulo", "Compromisso fixo"),
        descricao=data.get("descricao", ""),
        data=timezone.now(),
        recorrente=True,
        dia_semana=data.get("dia_semana"),
        hora_inicio=data.get("hora_inicio"),
        hora_fim=data.get("hora_fim"),
    )
    return JsonResponse({"mensagem": "Compromisso fixo criado.", "id": compromisso.id}, status=201)


@csrf_exempt
def gerar_compromissos_editaveis(request):
    if request.method != "POST":
        return JsonResponse({"erro": "Método não permitido"}, status=405)

    data = _json_body(request)
    user_id = data.get("user_id")
    inicio = datetime.fromisoformat(data.get("inicio", timezone.now().date().isoformat())).date()
    fim = datetime.fromisoformat(data.get("fim", (inicio + timedelta(days=7)).isoformat())).date()

    fixos = Compromisso.objects.filter(user_id=user_id, recorrente=True)
    criados = 0

    for compromisso in fixos:
        if compromisso.dia_semana is None or not compromisso.hora_inicio:
            continue

        atual = inicio
        while atual <= fim:
            if atual.weekday() == compromisso.dia_semana:
                inicio_dt = timezone.make_aware(datetime.combine(atual, compromisso.hora_inicio))
                existente = Compromisso.objects.filter(
                    user_id=user_id,
                    origem_fixa=compromisso,
                    data=inicio_dt,
                    recorrente=False,
                ).exists()
                if not existente:
                    Compromisso.objects.create(
                        user_id=user_id,
                        titulo=compromisso.titulo,
                        descricao=compromisso.descricao,
                        data=inicio_dt,
                        recorrente=False,
                        origem_fixa=compromisso,
                        hora_inicio=compromisso.hora_inicio,
                        hora_fim=compromisso.hora_fim,
                    )
                    criados += 1
            atual += timedelta(days=1)

    return JsonResponse({"mensagem": "Compromissos editáveis gerados.", "quantidade": criados})


def home(request):
    return render(request, "home.html")


def funcionalidades(request):
    return render(request, "funcionalidades.html")


def sobre(request):
    return render(request, "sobre.html")


def contato(request):
    return render(request, "contato.html")

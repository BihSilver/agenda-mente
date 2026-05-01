import json
import secrets

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import PerfilUsuario, RecuperacaoSenhaToken


def _json_body(request):
    try:
        return json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return {}


@csrf_exempt
def cadastro(request):
    if request.method != "POST":
        return JsonResponse({"erro": "Método não permitido"}, status=405)

    data = _json_body(request)
    email = data.get("email", "").strip().lower()
    username = data.get("username", "").strip()
    password = data.get("password", "")
    nome_completo = data.get("nome_completo", "").strip()
    telefone = data.get("telefone", "").strip()

    if not all([email, username, password, nome_completo, telefone]):
        return JsonResponse({"erro": "Preencha todos os campos obrigatórios."}, status=400)

    try:
        validate_email(email)
    except Exception:
        return JsonResponse({"erro": "E-mail inválido."}, status=400)

    if User.objects.filter(email=email).exists():
        return JsonResponse({"erro": "E-mail já cadastrado."}, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse({"erro": "Nome de usuário já cadastrado."}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    PerfilUsuario.objects.create(user=user, nome_completo=nome_completo, telefone=telefone)
    return JsonResponse({"mensagem": "Usuário cadastrado com sucesso."}, status=201)


@csrf_exempt
def login(request):
    if request.method != "POST":
        return JsonResponse({"erro": "Método não permitido"}, status=405)

    data = _json_body(request)
    username = data.get("username", "")
    password = data.get("password", "")
    user = authenticate(username=username, password=password)

    if not user:
        return JsonResponse({"erro": "Credenciais inválidas."}, status=401)

    return JsonResponse({"mensagem": "Login realizado com sucesso.", "user_id": user.id})


@csrf_exempt
def solicitar_recuperacao_senha(request):
    if request.method != "POST":
        return JsonResponse({"erro": "Método não permitido"}, status=405)

    data = _json_body(request)
    email = data.get("email", "").strip().lower()
    user = User.objects.filter(email=email).first()
    if not user:
        return JsonResponse({"erro": "E-mail não encontrado."}, status=404)

    token = secrets.token_hex(24)
    RecuperacaoSenhaToken.objects.create(user=user, token=token)
    return JsonResponse(
        {
            "mensagem": "Token de recuperação gerado.",
            "token": token,
        }
    )


@csrf_exempt
def redefinir_senha(request):
    if request.method != "POST":
        return JsonResponse({"erro": "Método não permitido"}, status=405)

    data = _json_body(request)
    token = data.get("token", "")
    nova_senha = data.get("nova_senha", "")

    token_obj = RecuperacaoSenhaToken.objects.filter(token=token, usado=False).first()
    if not token_obj:
        return JsonResponse({"erro": "Token inválido ou já utilizado."}, status=400)

    user = token_obj.user
    user.set_password(nova_senha)
    user.save()

    token_obj.usado = True
    token_obj.save(update_fields=["usado"])
    return JsonResponse({"mensagem": "Senha redefinida com sucesso."})

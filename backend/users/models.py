from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.db import models


class PerfilUsuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="perfil")
    nome_completo = models.CharField(max_length=255)
    telefone = models.CharField(
        max_length=20,
        validators=[
            RegexValidator(
                regex=r"^\+?[0-9()\-\s]{10,20}$",
                message="Telefone inválido.",
            )
        ],
    )

    def __str__(self):
        return self.nome_completo


class RecuperacaoSenhaToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tokens_recuperacao")
    token = models.CharField(max_length=64, unique=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    usado = models.BooleanField(default=False)

    def __str__(self):
        return f"Token de {self.user.username}"

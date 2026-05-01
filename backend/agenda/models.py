from django.contrib.auth.models import User
from django.db import models


class Compromisso(models.Model):
    DIAS_SEMANA = [
        (0, "Segunda"),
        (1, "Terça"),
        (2, "Quarta"),
        (3, "Quinta"),
        (4, "Sexta"),
        (5, "Sábado"),
        (6, "Domingo"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="compromissos")
    titulo = models.CharField(max_length=200)
    descricao = models.TextField(blank=True)
    data = models.DateTimeField()
    recorrente = models.BooleanField(default=False)
    dia_semana = models.IntegerField(choices=DIAS_SEMANA, null=True, blank=True)
    hora_inicio = models.TimeField(null=True, blank=True)
    hora_fim = models.TimeField(null=True, blank=True)
    origem_fixa = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="instancias_geradas",
    )

    def __str__(self):
        return self.titulo

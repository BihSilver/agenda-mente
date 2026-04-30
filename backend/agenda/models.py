from django.db import models

class Compromisso(models.Model):
    titulo = models.CharField(max_length=200)
    descricao = models.TextField(blank=True)
    data = models.DateTimeField()

    def __str__(self):
        return self.titulo

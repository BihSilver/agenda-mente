from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("agenda", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="compromisso",
            name="dia_semana",
            field=models.IntegerField(
                blank=True,
                choices=[
                    (0, "Segunda"),
                    (1, "Terça"),
                    (2, "Quarta"),
                    (3, "Quinta"),
                    (4, "Sexta"),
                    (5, "Sábado"),
                    (6, "Domingo"),
                ],
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="compromisso",
            name="hora_fim",
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="compromisso",
            name="hora_inicio",
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="compromisso",
            name="origem_fixa",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="instancias_geradas",
                to="agenda.compromisso",
            ),
        ),
        migrations.AddField(
            model_name="compromisso",
            name="recorrente",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="compromisso",
            name="user",
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name="compromissos", to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]

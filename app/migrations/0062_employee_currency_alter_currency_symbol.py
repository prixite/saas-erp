# Generated by Django 4.1 on 2023-02-23 07:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0061_alter_module_slug"),
    ]

    operations = [
        migrations.AddField(
            model_name="employee",
            name="currency",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="app.currency",
            ),
        ),
        migrations.AlterField(
            model_name="currency",
            name="symbol",
            field=models.CharField(max_length=3),
        ),
    ]
# Generated by Django 4.1.5 on 2023-02-08 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0056_alter_module_slug"),
    ]

    operations = [
        migrations.AlterField(
            model_name="team",
            name="members",
            field=models.ManyToManyField(related_name="teams", to="app.employee"),
        ),
    ]
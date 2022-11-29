# Generated by Django 4.1.3 on 2022-11-28 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0029_alter_employee_options"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="employee",
            name="contact_number",
        ),
        migrations.AddField(
            model_name="user",
            name="contact_number",
            field=models.CharField(default="", max_length=20),
            preserve_default=False,
        ),
    ]

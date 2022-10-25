# Generated by Django 4.1.2 on 2022-10-24 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0024_employee_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="module",
            name="slug",
            field=models.SlugField(
                choices=[
                    ("payroll", "Payroll"),
                    ("user", "User"),
                    ("employees", "Employees"),
                    ("inventory", "Inventory"),
                    ("settings", "Settings"),
                ]
            ),
        ),
    ]

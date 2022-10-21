# Generated by Django 4.1 on 2022-08-17 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0019_alter_employee_options_remove_employee_email"),
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
                ]
            ),
        ),
    ]

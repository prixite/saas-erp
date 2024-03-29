# Generated by Django 4.1.7 on 2023-04-04 12:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0064_merge_20230301_0954"),
    ]

    operations = [
        migrations.AddField(
            model_name="payroll",
            name="employee",
            field=models.OneToOneField(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="app.employee",
            ),
            preserve_default=False,
        ),
    ]

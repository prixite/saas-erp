# Generated by Django 4.1 on 2022-12-08 09:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0032_employee_slack_id_attendance"),
    ]

    operations = [
        migrations.AddField(
            model_name="employee",
            name="salary",
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="asset",
            name="employee",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="assets",
                to="app.employee",
            ),
        ),
    ]

# Generated by Django 4.0.5 on 2022-07-05 07:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0002_employee_organization_salary_alter_user_email_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="salary",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="organization",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="app.organization",
            ),
        ),
    ]
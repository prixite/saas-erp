# Generated by Django 4.0.5 on 2022-07-21 06:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_asset_assettype_benefit_compensation_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='compensation',
            old_name='hourly_limit_per_month',
            new_name='expected_hours_per_week',
        ),
        migrations.RenameField(
            model_name='compensation',
            old_name='hourly_limit_per_week',
            new_name='max_hours_per_week',
        ),
        migrations.AddField(
            model_name='document',
            name='type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='app.documenttype'),
        ),
        migrations.AddField(
            model_name='role',
            name='is_owner',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.PROTECT, to='app.role'),
        ),
        migrations.AlterField(
            model_name='employee',
            name='type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='app.employmenttype'),
        ),
        migrations.AlterField(
            model_name='user',
            name='organization',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.PROTECT, to='app.organization'),
        ),
        migrations.CreateModel(
            name='Payroll',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
                ('tax', models.FloatField()),
                ('currency_convesion_rates', models.JSONField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('currency', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='app.currency')),
            ],
        ),
        migrations.AddField(
            model_name='compensationhistory',
            name='payroll',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.payroll'),
        ),
    ]

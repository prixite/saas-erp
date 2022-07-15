# Generated by Django 4.0.5 on 2022-07-04 13:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Employee",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("contact_number", models.CharField(max_length=20)),
                ("nic", models.CharField(max_length=25)),
                ("date_of_joining", models.DateField()),
                ("emergency_contact_number", models.CharField(max_length=20)),
                ("last_employer_experience_letter", models.BooleanField(default=False)),
                ("last_employer_salary_slip", models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name="Organization",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("address", models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name="Salary",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("amount", models.FloatField()),
                ("currency", models.CharField(max_length=5)),
                (
                    "employee",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE, to="app.employee"
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Salaries",
            },
        ),
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(
                max_length=254, unique=True, verbose_name="email address"
            ),
        ),
        migrations.CreateModel(
            name="SalaryHistory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("amount", models.FloatField()),
                ("action", models.CharField(max_length=5)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "salary",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.salary"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Degrees",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("programe", models.CharField(max_length=50)),
                ("institute", models.CharField(max_length=100)),
                ("grade", models.CharField(max_length=4)),
                ("year_of_graduation", models.DateField()),
                (
                    "employee",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="degrees",
                        to="app.employee",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="user",
            name="organization",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.PROTECT,
                to="app.organization",
            ),
            preserve_default=False,
        ),
    ]
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)

    organization = models.ForeignKey(
        "Organization", on_delete=models.PROTECT, null=True
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


class Organization(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)


class SalaryHistory(models.Model):
    salary = models.ForeignKey("Salary", on_delete=models.CASCADE)
    amount = models.FloatField()
    action = models.CharField(max_length=5)
    created_at = models.DateTimeField(auto_now_add=True)


class Salary(models.Model):
    employee = models.OneToOneField("Employee", on_delete=models.CASCADE)
    amount = models.FloatField()
    currency = models.CharField(max_length=5)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Salaries"


class Employee(models.Model):
    name = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=20)
    nic = models.CharField(max_length=25)
    date_of_joining = models.DateField()
    emergency_contact_number = models.CharField(max_length=20)

    last_employer_experience_letter = models.BooleanField(default=False)
    last_employer_salary_slip = models.BooleanField()


class Degrees(models.Model):
    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="degrees"
    )
    programe = models.CharField(max_length=50)
    institute = models.CharField(max_length=100)
    grade = models.CharField(max_length=4)
    year_of_graduation = models.DateField()

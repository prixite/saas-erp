from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
    This model represents a user that can log into ERP. A user can also be a
    employee, but an employee might not be a user.
    """
    email = models.EmailField(_("email address"), unique=True)

    organization = models.ForeignKey(
        "Organization", on_delete=models.PROTECT, null=True
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


class Organization(models.Model):
    """
    This model is used to add organization scope. A data belonging to one
    organization should only be visible to that organization.
    """
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrganizationModule(models.Model):
    """
    Use this model to manage module access to an organization. There should be
    a row for every module-organization pair in this model. We control access
    using is_enabled boolean.
    """
    module = models.ForeignKey("Module", on_delete=models.PROTECT)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    is_enabled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Module(models.Model):
    """
    Currently we support following modules:
    - Payroll
    - Employee
    - Inventory
    """
    slug = models.SlugField()
    name = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Role(models.Model):
    """
    Currently we support following roles:
    - Admin
    - Member
    """
    name = models.CharField(max_length=64)
    is_admin = models.BooleanField(default=False)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Currency(models.Model):
    """
    Currently we support following currencies:
    - USD
    - PKR
    """
    code = models.CharField(max_length=3)
    symbol = models.CharField(max_length=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

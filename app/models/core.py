from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
    This model represents a user that can log into ERP. A user can also be an
    employee, but an employee might not be a user.
    """

    email = models.EmailField(_("email address"), unique=True)

    organization = models.OneToOneField(
        "Organization", on_delete=models.CASCADE, null=True
    )

    default_role = models.ForeignKey("Role", on_delete=models.SET_NULL, null=True)

    # this field should not be stored in DB. This field will be updated by
    # view to True if the user is admin for the module being accessed.
    is_module_admin = False

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    @property
    def modules(self):
        return {x.module for x in self.module_role_set.all()}


class Organization(models.Model):
    """
    This model is used to add organization scope. A data belonging to one
    organization should only be visible to that organization.
    """

    name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


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


class UserModuleRole(models.Model):
    """
    Use this model to manage role of user for a module. A user can have
    different roles in different modules.
    """

    module = models.ForeignKey("Module", on_delete=models.PROTECT)
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="module_role_set"
    )
    role = models.ForeignKey("Role", on_delete=models.PROTECT)
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
    - Owner: Super user for an organization. This is organization role. It
      cannot be assigned to module. There should always be atleast one owner.
    - Admin: Can manage data of other users.
    - Member: Can only manage own data.
    """

    name = models.CharField(max_length=64)
    is_owner = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_member = models.BooleanField(default=False)
    is_default = models.BooleanField(default=False)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


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

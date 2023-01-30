import random

from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _

from .soft_delete import SoftDeleteUserModel


class User(SoftDeleteUserModel, AbstractUser):
    """
    This model represents a user that can log into ERP. A user can also be an
    employee, but an employee might not be a user.
    """

    email = models.EmailField(_("email address"), unique=True, db_index=True)

    organization = models.ForeignKey(
        "Organization", on_delete=models.CASCADE, null=True
    )

    image = models.URLField(
        default="https://prixite-erp-dev.s3.ap-southeast-1.amazonaws.com/media/bpD666m3TGWrvp75gU8nhh.png"  # noqa
    )

    contact_number = models.CharField(max_length=20, null=True, blank=True)

    headline = models.CharField(_("headline"), max_length=255, null=True, blank=True)

    default_role = models.ForeignKey("Role", on_delete=models.SET_NULL, null=True)
    is_onboarded = models.BooleanField(default=False)

    bill_update_email = models.BooleanField(default=False)
    bill_update_phone = models.BooleanField(default=False)

    new_team_member_email = models.BooleanField(default=False)
    new_team_member_phone = models.BooleanField(default=False)

    newsletters_email = models.BooleanField(default=False)
    newsletters_phone = models.BooleanField(default=False)

    # this field should not be stored in DB. This field will be updated by
    # view to True if the user is admin for the module being accessed.
    is_module_admin = False
    # this field should not be stored in DB. This field will be updated by
    # view to True if the user is owner for the module being accessed.
    is_module_owner = False

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def get_modules(self, permission):
        module_roles = self.module_roles.filter(module__is_enabled=True)

        if (
            self.default_role
            and self.default_role.permission == Role.Permission.OWNER
            and permission is not Role.Permission.OWNER
        ):
            return []

        if (
            self.default_role
            and self.default_role.permission == Role.Permission.OWNER
            and permission == Role.Permission.OWNER
        ):
            return self.organization_modules

        module_roles = module_roles.filter(role__permission=permission)

        return {x.module for x in module_roles}

    @property
    def organization_modules(self):
        return {
            x.module
            for x in OrganizationModule.objects.filter(
                organization=self.organization,
                module__is_enabled=True,
                is_enabled=True,
            )
        }

    @property
    def member_modules(self):
        return self.get_modules(Role.Permission.MEMBER)

    @property
    def admin_modules(self):
        return self.get_modules(Role.Permission.ADMIN)

    @property
    def owner_modules(self):
        return self.get_modules(Role.Permission.OWNER)


class Invitation(models.Model):
    """
    This model is used to track the invitation of the user.
    """

    user = models.OneToOneField("User", on_delete=models.CASCADE)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def generate_key(self):
        self.slug = f"{self.user.id}{random.randint(0, 2**31-1)}"


class Organization(models.Model):
    """
    This model is used to add organization scope. A data belonging to one
    organization should only be visible to that organization.
    """

    name = models.CharField(max_length=50, unique=True)
    address = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def owner(self):
        return self.user_set.filter(
            default_role__permission=Role.Permission.OWNER
        ).first()


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

    def __str__(self):
        return f"{self.organization.name} {self.module.name}"

    def validate_unique(self, exclude):
        if (
            self.__class__.objects.filter(
                module=self.module, organization=self.organization
            )
            .exclude(id=self.id)
            .exists()
        ):
            raise ValidationError(
                message="This module already exists in this organization.",
                code="unique_together",
            )
        super().validate_unique(exclude)


class UserModuleRole(models.Model):
    """
    Use this model to manage role of user for a module. A user can have
    different roles in different modules.
    """

    module = models.ForeignKey("Module", on_delete=models.PROTECT)
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="module_roles"
    )
    role = models.ForeignKey("Role", on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.get_full_name()} {self.module.name} {self.role.permission}"


class Module(models.Model):
    """
    Currently we support following modules:
    - Payroll
    - Employee
    - Inventory
    - Settings
    - User
    """

    class ModuleType(models.TextChoices):
        PAYROLL = "payroll", "Payroll"
        USER = "user", "User"
        EMPLOYEES = "employees", "Employees"
        INVENTORY = "inventory", "Inventory"
        SETTINGS = "settings", "Settings"

    slug = models.SlugField(choices=ModuleType.choices)
    name = models.CharField(max_length=64, unique=True)
    is_enabled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Role(models.Model):
    """
    Currently we support following roles:
    - Owner: Super user for an organization. This is organization role. It
      cannot be assigned to module. There should always be atleast one owner.
    - Admin: Can manage data of other users.
    - Member: Can only manage own data.
    """

    class Permission(models.TextChoices):
        OWNER = "c", "Owner"
        ADMIN = "b", "Admin"
        MEMBER = "a", "Member"

    name = models.CharField(max_length=64)
    permission = models.CharField(
        max_length=1, choices=Permission.choices, default=Permission.MEMBER
    )
    is_default = models.BooleanField(default=False)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                name="unique_name_organization",
                fields=["name", "organization"],
            ),
        ]

    def __str__(self):
        return f"{self.name} {self.organization.name}"


class Currency(models.Model):
    """
    Currently we support following currencies:
    - USD
    - PKR
    """

    code = models.CharField(max_length=3)
    symbol = models.CharField(max_length=1)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

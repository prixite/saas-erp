from django.conf import settings
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from app import models


@admin.register(models.User)
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            _("Personal info"),
            {"fields": ("first_name", "last_name", "email", "contact_number")},
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "password1", "password2"),
            },
        ),
    )


@admin.register(models.Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "organization",
        "designation",
        "department",
        "manager",
        "date_of_joining",
    ]
    search_fields = [
        "user__email",
        "organization__name",
        "nic",
        "designation",
        "department",
    ]
    list_filter = ["organization", "type", "department", "user_allowed"]
    filter_horizontal = ["benefits"]
    raw_id_fields = (
        "user",
        "organization",
        "department",
        "manager",
        "benefits",
        "type",
    )


@admin.register(models.Compensation)
class CompensationAdmin(admin.ModelAdmin):
    list_display = ["employee", "max_hours_per_week"]
    list_filter = ["compensation_type", "compensation_schedule"]


@admin.register(models.Organization)
class OrganizationAdmin(admin.ModelAdmin):
    pass


if settings.DEBUG:

    @admin.register(models.Role)
    class RoleAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.UserModuleRole)
    class UserModuleRoleAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.Module)
    class ModuleAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.OrganizationModule)
    class OrganizationModuleAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.Degree)
    class DegreeAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.Institute)
    class InstituteAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.Program)
    class ProgramAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.Department)
    class DepartmentAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.Benefit)
    class BenefitAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.EmploymentType)
    class EmploymentTypeAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.Company)
    class CompanyAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.Experience)
    class ExperienceAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.Document)
    class DocuemntAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.DocumentType)
    class DocumentTypeAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.Currency)
    class CurrencyAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.CompensationType)
    class CompensationTypeAdmin(admin.ModelAdmin):
        pass

    @admin.register(models.CompensationSchedule)
    class CompensationScheduleAdmin(admin.ModelAdmin):
        pass

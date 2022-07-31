from django.conf import settings
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from app import models
from app.admin import inline_admin


@admin.register(models.User)
class UserAdmin(UserAdmin):
    pass


@admin.register(models.Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "contact_number",
        "manager",
        "date_of_joining",
        "created_at",
        "updated_at",
    )
    list_filter = ("organization", "type", "benefits")
    filter_horizontal = ("benefits",)


@admin.register(models.Compensation)
class CompensationAdmin(admin.ModelAdmin):
    list_display = ("employee", "max_hours_per_week", "created_at", "updated_at")
    list_filter = ("compensation_type", "compensation_schedule")


@admin.register(models.Organization)
class OrganizationAdmin(admin.ModelAdmin):
    fields = ("name", "address")
    inlines = [
        inline_admin.UserInline,
        inline_admin.OrganizationModuleInline,
    ]


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

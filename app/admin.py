from django.conf import settings
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from app import models


@admin.register(models.User)
class UserAdmin(UserAdmin):
    pass


@admin.register(models.Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Compensation)
class CompensationAdmin(admin.ModelAdmin):
    pass


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

from django.conf import settings
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from app import models


@admin.register(models.User)
class UserAdmin(UserAdmin):
    pass


@admin.register(models.Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ["contact_number", "manager", "date_of_joining"]
    list_filter = ["organization", "type", "benefits"]
    filter_horizontal = ["benefits"]


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

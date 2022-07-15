from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from app import models

# Register your models here.


@admin.register(models.User)
class UserAdmin(UserAdmin):
    pass


@admin.register(models.Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Salary)
class SalaryAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Organization)
class OrganizationAdmin(admin.ModelAdmin):
    pass

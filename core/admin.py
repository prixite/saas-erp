from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from core import models

# Register your models here.


@admin.register(models.User)
class UserAdmin(UserAdmin):
    pass


@admin.register(models.Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass

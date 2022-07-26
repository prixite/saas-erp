from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from app import inline_admin, models


@admin.register(models.User)
class UserAdmin(UserAdmin):
    pass


@admin.register(models.Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ["name", "contact_number", "manager", "date_of_joining"]
    list_filter = ["organization", "type", "benefits"]
    filter_horizontal = ["benefits"]


@admin.register(models.Compensation)
class CompensationAdmin(admin.ModelAdmin):
    list_display = ["employee", "max_hours_per_week"]
    list_filter = ["compensation_type", "compensation_schedule"]


@admin.register(models.Organization)
class OrganizationAdmin(admin.ModelAdmin):
    fields = ("name", "address")
    inlines = [
        inline_admin.UserInline,
        inline_admin.OrganizationModuleInline,
    ]

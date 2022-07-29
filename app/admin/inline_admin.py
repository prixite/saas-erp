from django.contrib import admin

from app import models
from app.admin import admin_forms as forms


class UserInline(admin.TabularInline):
    model = models.User
    form = forms.OrganizationUserForm
    extra = 0


class OrganizationModuleInline(admin.TabularInline):
    model = models.OrganizationModule
    fields = ["module", "is_enabled"]
    extra = 0

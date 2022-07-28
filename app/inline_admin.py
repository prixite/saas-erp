from django.contrib import admin

from app import forms, models


class UserInline(admin.TabularInline):
    model = models.User
    # fields = ["email","default_role"]
    form = forms.UserInlineFormset

    def get_queryset(self, request):
        return models.User.objects.all()


class OrganizationModuleInline(admin.TabularInline):
    model = models.OrganizationModule
    fields = ["module", "is_enabled"]

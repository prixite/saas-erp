from django import forms

from app import models


class OrganizationUserForm(forms.ModelForm):
    class Meta:
        model = models.User
        fields = [
            "email",
            "default_role",
        ]

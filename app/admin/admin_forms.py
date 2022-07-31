from django import forms

from app import models


class OrganizationUserForm(forms.ModelForm):
    class Meta:
        model = models.User
        fields = [
            "users",
            "default_role",
        ]

    users = forms.ModelChoiceField(queryset=models.User.objects.all())

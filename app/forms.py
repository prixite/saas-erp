from django import forms
from django.db import transaction
from django.forms import ModelForm

from app import models
from app.lib.user import create_and_send_invite


class UserForm(ModelForm):
    class Meta:
        model = models.User
        fields = ["email", "first_name", "last_name", "default_role"]

    @transaction.atomic
    def save(self):
        self.instance.username = self.instance.email
        super().save()
        create_and_send_invite(self.instance)
        return self.instance


class OwnerForm(UserForm):
    class Meta(UserForm.Meta):
        fields = ["email", "first_name", "last_name", "organization"]

    def save(self):
        self.instance.default_role = models.Role.objects.filter(
            organization=self.instance.organization,
            permission=models.Role.Permission.OWNER,
            is_default=True,
        ).first()
        return super().save()


class EmployeeForm(ModelForm):
    email = forms.EmailField()
    first_name = forms.CharField()
    last_name = forms.CharField()
    default_role = forms.ModelChoiceField(queryset=None)

    class Meta:
        model = models.Employee
        fields = [
            "email",
            "first_name",
            "last_name",
            "default_role",
            "contact_number",
            "nic",
            "date_of_joining",
        ]

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop("request")
        super().__init__(*args, **kwargs)
        self.fields["default_role"].queryset = models.Role.objects.filter(
            organization=self.request.user.organization,
        )

    def clean_email(self):
        # TODO: Add unique validation.
        return self.cleaned_data['email']

    @transaction.atomic
    def save(self):
        self.instance.user = models.User.objects.create_user(
            self.cleaned_data['email'],
            email=self.cleaned_data['email'],
            first_name=self.cleaned_data["first_name"],
            last_name=self.cleaned_data["last_name"],
            default_role=self.cleaned_data["default_role"],
            organization=self.request.user.organization,
        )
        super().save()
        create_and_send_invite(self.instance.user)
        return self.instance

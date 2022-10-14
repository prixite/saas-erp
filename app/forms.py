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
        if not self.instance.id:
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


class EmployeeUserForm(UserForm):
    def __init__(self, request, *args, **kwargs):
        self.request = request
        if kwargs["instance"]:
            kwargs["instance"] = kwargs["instance"].user
        super().__init__(*args, **kwargs)
        self.fields["default_role"].queryset = models.Role.objects.filter(
            organization=request.user.organization,
        )

    def clean_email(self):
        # TODO: Add unique validation.
        return self.cleaned_data["email"]

    def save(self):
        self.instance.organization = self.request.user.organization
        return super().save()


class EmployeeForm(ModelForm):
    class Meta:
        model = models.Employee
        fields = ["nic", "contact_number", "date_of_joining", "image"]

    def __init__(self, *args, **kwargs):
        request = kwargs.pop("request")
        self.user_form = EmployeeUserForm(request, *args, **kwargs)
        super().__init__(*args, **kwargs)

    def full_clean(self):
        self.user_form.full_clean()
        super().full_clean()

    def is_valid(self):
        return self.user_form.is_valid() and super().is_valid()

    @transaction.atomic
    def save(self):
        self.instance.user = self.user_form.save()
        return super().save()

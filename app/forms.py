from django.db import transaction
from django.forms import ModelForm

from app import models
from app.lib.user import create_and_send_invite


class UserBaseForm(ModelForm):
    model = models.User
    fields = ["email", "first_name", "last_name", "default_role"]

    @transaction.atomic
    def save(self):
        self.instance.username = self.instance.email
        super().save()
        create_and_send_invite(self.instance)
        return self.instance


class UserForm(UserBaseForm):
    model = models.User

    def save(self):
        self.instance.organization = self.request.user.organization
        return super().save()


class OwnerForm(UserBaseForm):
    model = models.User
    fields = ["email", "first_name", "last_name", "organization"]

    def save(self):
        self.instance.default_role = models.Role.objects.filter(
            organization=self.instance.organization,
            permission=models.Role.Permission.OWNER,
            is_default=True,
        ).first()
        return super().save()

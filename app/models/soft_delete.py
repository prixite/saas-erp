from django.contrib.auth.models import UserManager
from django.db import models
from django.utils import timezone


class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class SoftDeleteModel(models.Model):

    is_deleted = models.BooleanField(default=False, db_index=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    objects = SoftDeleteManager()
    all_objects = models.Manager()

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    def restore(self):
        self.is_deleted = False
        self.deleted_at = None
        self.save()

    class Meta:
        abstract = True


class SoftDeleteUserManager(UserManager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class SoftDeleteUserModel(SoftDeleteModel):

    objects = SoftDeleteUserManager()
    all_objects = UserManager()

    class Meta:
        abstract = True


class ActiveEmployeeManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(employee__is_deleted=False)


class ActiveEmployeeModel(models.Model):

    objects = ActiveEmployeeManager()
    all_objects = models.Manager()

    class Meta:
        abstract = True

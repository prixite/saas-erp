from django.db.models.signals import pre_save
from django.dispatch import receiver

from app import models
from app.lib.user import create_and_send_invite


@receiver(pre_save, sender=models.Employee)
def create_user(sender, instance, **kwargs):
    user = models.User.objects.create(
        username=instance.nic,
        is_active=instance.user_allowed,
        email=instance.email,  # Todo
    )
    instance.user = user
    create_and_send_invite(user)

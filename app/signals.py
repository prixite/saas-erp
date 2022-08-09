from django.db.models.signals import post_save
from django.dispatch import receiver

from app import models
from app.lib.user import create_and_send_invite

@receiver(post_save, sender=models.Employee)
def create_user(sender, **kwargs):
    if kwargs["created"] and kwargs['instance'].user_allowed:
        user = models.User.objects.create(
            is_active=kwargs["instance"].user_allowed # pass in email from employee creation into this.
        )
        create_and_send_invite(user)

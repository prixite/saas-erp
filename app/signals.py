from django.db.models.signals import post_save

from django.dispatch import receiver

from app import models

@receiver(post_save,sender=models.Employee)
def create_user(sender,**kwargs):
    if kwargs['created']:
        models.User.objects.create(username=None,email=None,is_active=kwargs['created']['user_allowed'])
        # Create a user here, allow/disallow user login.
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_bytes
from django.utils.http import urlsafe_base64_encode
from app.utils import send_invitation_mail


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def send_passord_reset_email(sender, instance, created, **kwargs):
    if created:
        uidb64 = urlsafe_base64_encode(smart_bytes(instance.id))
        token = PasswordResetTokenGenerator().make_token(instance)
        url = f"{settings.DOMAIN_NAME}/reset-password/?uidb64={uidb64}&token={token}"
        send_invitation_mail(instance.email, instance, url)

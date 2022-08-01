from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

from app import models


def send_invite(user):
    if user.is_onboarded:
        return

    send_mail(
        "You have been invited to Prixite ERP",
        render_to_string(
            "app/email/invite.html",
            context=dict(user=user, DOMAIN_NAME=settings.DOMAIN_NAME),
        ),
        "no-reply@prixite.com",
        [user.email],
    )


def create_and_send_invite(user):
    invite = models.Invitation(user=user)
    invite.generate_key()
    invite.save()
    send_invite(user)

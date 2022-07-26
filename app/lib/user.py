from django.core.mail import send_mail
from django.template.loader import render_to_string


def send_invite(user):
    if user.is_onboarded:
        return

    send_mail(
        "You have been invited to Prixite ERP",
        render_to_string("app/email/invite.html", context=dict(user=user)),
        "no-reply@prixite.com",
        [user.email],
    )

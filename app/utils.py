from django.conf import settings
from django.core.mail import send_mail


def send_invitation_mail(to_email, name, url):
    subject = f"welcome {name}"
    message = f"Click below link to update your password \n {url}"
    email_from = settings.DEFAULT_FROM_EMAIL
    recipient_list = [
        to_email,
    ]

    try:
        send_mail(subject, message, email_from, recipient_list)
    except Exception as e:
        print(f"Exception when calling SMTPApi: {e}")

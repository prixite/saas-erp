from django.conf import settings
from django.core.mail import send_mail


def send_leave_email(to_email, status):
    subject = f"leave {status}"
    message = f"leave {status}"
    email_from = settings.DEFAULT_FROM_EMAIL
    try:
        send_mail(subject, message, email_from, to_email)
    except Exception as e:
        print(f"Exception when calling SMTPApi: {e}")

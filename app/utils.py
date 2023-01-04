from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string


def send_leave_email(to_email, status):
    subject = f"Leave {status}"
    message = f"Leave {status}"
    email_from = settings.DEFAULT_FROM_EMAIL
    try:
        send_mail(subject, message, email_from, to_email)
    except Exception as e:
        return e


def send_email_forget_password(data):
    subject = "Account password reset"
    html_message = render_to_string(
        "app/email/reset_password.html",
        {
            "password_reset_url": data.get("password_reset_url"),
            "user": data.get("user"),
        },
    )
    try:
        send_mail(
            subject,
            "",
            settings.DEFAULT_FROM_EMAIL,
            [data.get("to_email")],
            html_message=html_message,
        )
    except Exception as e:
        return e

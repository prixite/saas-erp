from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render


def send_leave_email(to_email, status):
    subject = f"Leave {status}"
    message = f"Leave {status}"
    email_from = settings.DEFAULT_FROM_EMAIL
    try:
        send_mail(subject, message, email_from, to_email)
    except Exception as e:
        return e


def send_email_forget_password(request, data):
    subject = "Account password reset"
    password_reset_url = data.get("password_reset_url")
    rendered_template = render(
        request,
        "email_template.html",
        context={"password_reset_url": password_reset_url},
    )
    html_content = rendered_template.content.decode()

    send_mail(
        subject,
        f"localhost:8000/{data.get('relativeLink')}",
        settings.DEFAULT_FROM_EMAIL,
        [data.get("to_email")],
        html_message=html_content,
    )

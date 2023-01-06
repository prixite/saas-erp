from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string


def send_invitation_mail(to_email, user, url):
    subject = f"Welcome {user.get_full_name()}"
    message = f"Click below link to update your password \n {url}"
    email_from = settings.DEFAULT_FROM_EMAIL
    recipient_list = [
        to_email,
    ]
    html_message = render_to_string(
        "app/email/invite.html",
        {
            "full_name": user.get_full_name(),
            "invite_link": url,
        },
    )
    try:
        send_mail(
            subject,
            message,
            email_from,
            recipient_list,
            html_message=html_message,
        )
    except Exception as e:
        return e


def send_leave_email(status, employee, updated_by, leave_from, leave_to, hr_comment):
    subject = f"Leave {status}"
    employee_message = f"Hi {employee.user.get_full_name()}, your leave request from {leave_from} to {leave_to} have been {status} by {updated_by.get_full_name()} with remarks as {hr_comment}."  # noqa
    email_from = settings.DEFAULT_FROM_EMAIL

    try:
        send_mail(subject, employee_message, email_from, [employee.user.email])
        if employee.manager:
            maanger_message = f"Hi {employee.manager.user.get_full_name()}, we have successfully informed {employee.user.get_full_name()} that their leave request from {leave_from} to {leave_to} have been {status} by  {updated_by.get_full_name()} with remarks as {hr_comment}."  # noqa
            send_mail(
                subject, maanger_message, email_from, [employee.manager.user.email]
            )
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

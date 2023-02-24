import boto3
from botocore.exceptions import ClientError
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
    data = {
        "employee": employee,
        "leave_from": leave_from,
        "leave_to": leave_to,
        "status": status,
        "hr_comment": hr_comment,
        "updated_by": updated_by.get_full_name(),
    }
    html_emplyee_message = render_to_string(
        "app/email/leave_update.html",
        data,
    )
    email_from = settings.DEFAULT_FROM_EMAIL
    try:
        send_mail(
            subject,
            "",
            email_from,
            [employee.user.email],
            html_message=html_emplyee_message,
        )
        if employee.manager:
            html_manager_message = render_to_string(
                "app/email/leaveupdate_manager.html",
                data,
            )
            send_mail(
                subject,
                "",
                email_from,
                [employee.manager.user.email],
                html_message=html_manager_message,
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


def create_presigned_url(filename, filetype, expiration=300):
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_DEFAULT_REGION,
    )
    try:
        response = s3_client.generate_presigned_url(
            "put_object",
            {
                "Bucket": settings.AWS_STORAGE_BUCKET_NAME,
                "Key": filename,
                "ContentType": filetype,
                "ACL": "public-read",
            },
            ExpiresIn=expiration,
        )
        return response
    except ClientError:
        return None


def create_predesigned_url_delete(key, expiration=300):
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_DEFAULT_REGION,
    )
    try:
        response = s3_client.generate_presigned_url(
            "delete_object",
            {"Bucket": settings.AWS_STORAGE_BUCKET_NAME, "Key": key},
            ExpiresIn=expiration,
        )
        return response
    except ClientError:
        return None

from django.conf import settings
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK


def send_leave_email(to_email, status):
    subject = f"Leave {status}"
    message = f"Leave {status}"
    email_from = settings.DEFAULT_FROM_EMAIL
    send_mail(subject, message, email_from, to_email)
    # try:
    # except Exception as e:
    #     print("HEREEEEEEEEEEEEEEEEEEEE")
    #     return Response(
    #         data={
    #             "text": "Error sending email. Please try again",
    #         },
    #         status=HTTP_200_OK,
    #     )

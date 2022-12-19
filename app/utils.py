from django.core.mail import send_mail


def send_leave_email(to_email):
    subject = "Congrats! leave Granted"
    message = "leave grandted"
    email_from = "into@example.com"
    recipient_list = to_email

    try:
        send_mail(subject, message, email_from, recipient_list)
    except Exception as e:
        print(f"Exception when calling SMTPApi: {e}")

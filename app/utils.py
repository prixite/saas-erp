from django.conf import settings
from django.core.mail import send_mail

def send_invitation_mail(to_email, name, url):
    print("**********************",to_email)
    subject = f'welcome {name}'
    message = f'Click below link to change your password \n {url}'
    email_from = 'to@example.com'
    recipient_list = [to_email, ]
    print("**********************",email_from)

    try:
        send_mail( subject, message, email_from, recipient_list )
    except Exception as e:
        print(f"Exception when calling SMTPApi: {e}")
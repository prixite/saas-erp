from django.core.management.base import BaseCommand

from app.models import User
from app.utils import push_notification


class Command(BaseCommand):
    help = "Send Test Alert to Websocket"

    def handle(self, *args, **options):
        msg = "Sending test notifications"
        user = User.objects.get(pk=1)
        push_notification(user, msg)

        self.stdout.write(self.style.SUCCESS("Done"))

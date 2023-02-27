from django.core.management.base import BaseCommand

from app.utils import push_notification


class Command(BaseCommand):
    help = "Send Test Alert to Websocket"

    def handle(self, *args, **options):
        msg = "Sending test notifications"

        push_notification(msg)

        self.stdout.write(self.style.SUCCESS("Done"))

from django.core.management.base import BaseCommand
from django.db import transaction

from core import factories


class Command(BaseCommand):
    @transaction.atomic
    def handle(self, *args, **options):
        factories.UserFactory(
            is_superuser=True,
            is_staff=True,
            username="super-admin@example.com",
        )

        self.stdout.write(self.style.SUCCESS("Data generated Successfully"))

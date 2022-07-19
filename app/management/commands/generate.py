from django.core.management.base import BaseCommand
from django.db import transaction

from app import factories


class Command(BaseCommand):
    @transaction.atomic
    def handle(self, *args, **options):
        factories.UserFactory(
            is_superuser=True,
            is_staff=True,
            email="super-admin@example.com",
        )
        organization = factories.OrganizationFactory()
        employement_type = factories.EmploymentType()
        factories.EmployeeFactory.create_batch(
            size=10,
            department=factories.DepartmentFactory(),
            organization=organization,
            manager=factories.EmployeeFactory(
                organization=organization, type=employement_type
            ),
            type=employement_type,
        )

        self.stdout.write(self.style.SUCCESS("Data generated Successfully"))

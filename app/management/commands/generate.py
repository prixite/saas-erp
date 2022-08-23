import factory
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
        employement_type = factories.EmploymentTypeFactory(name="Full time")

        factories.CurrencyFactory.create_batch(size=3)
        self.add_compensation_type_instances(organization)
        self.add_compenstation_schedule_instances(organization)

        factories.InstituteFactory.create_batch(
            size=3,
            name=factory.Faker("name"),
            organization=organization,
        )
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

    def add_compensation_type_instances(self, organization):
        factories.CompensationTypeFactory(
            name="hourly",
            is_hourly=True,
            organization=organization,
        )
        factories.CompensationTypeFactory(
            name="monthly",
            is_monthly=True,
            organization=organization,
        )
        factories.CompensationTypeFactory(
            name="milestone",
            is_milestone=True,
            organization=organization,
        )

    def add_compenstation_schedule_instances(self, organization):
        factories.CompensationScheduleFactory(
            name="monthly",
            is_monthly=True,
            organization=organization,
        )
        factories.CompensationScheduleFactory(
            name="weekly",
            is_weekly=True,
            organization=organization,
        )

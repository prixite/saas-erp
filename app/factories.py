import random

import factory
from django.utils import timezone
from faker import Faker

from app import models

fake = Faker()
fake.seed_instance(1234)


class UserFactory(factory.django.DjangoModelFactory):
    email = factory.Sequence(lambda x: fake.unique.email())
    username = factory.LazyAttribute(lambda x: x.email)

    class Meta:
        model = models.User

    @factory.post_generation
    def password(obj, create, extracted, **kwargs):
        if not create:
            return

        obj.set_password("admin")
        obj.save()


class OrganizationFactory(factory.django.DjangoModelFactory):
    name = factory.Faker("company")
    address = factory.Faker("address")

    class Meta:
        model = models.Organization


class EmployeeFactory(factory.django.DjangoModelFactory):
    name = factory.Faker("name")
    contact_number = factory.Faker("phone_number")
    emergency_contact_number = factory.Faker("phone_number")
    date_of_joining = factory.Faker("date")
    organization = factory.iterator(models.Organization.objects.all)
    compensation = factory.RelatedFactory(
        "app.factories.CompensationFactory",
        rate=random.randint(10, 50),
        factory_related_name="employee",
    )

    class Meta:
        model = models.Employee


class DepartmentFactory(factory.django.DjangoModelFactory):
    name = factory.Faker("name")
    organization = factory.iterator(models.Organization.objects.all)
    updated_at = factory.LazyFunction(timezone.now)

    class Meta:
        model = models.Department


class EmploymentType(factory.django.DjangoModelFactory):
    name = factory.Faker("name")
    organization = factory.iterator(models.Organization.objects.all)
    updated_at = factory.LazyFunction(timezone.now)

    class Meta:
        model = models.EmploymentType


class CurrencyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Currency


class CompensationFactory(factory.django.DjangoModelFactory):
    max_hours_per_week = 40
    expected_hours_per_week = 38
    compensation_type = factory.iterator(models.CompensationType.objects.all)
    compensation_schedule = factory.iterator(models.CompensationSchedule.objects.all)
    currency = factory.iterator(models.Currency.objects.all)
    updated_at = factory.LazyFunction(timezone.now)

    class Meta:
        model = models.Compensation


class CompensationTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.CompensationType


class CompensationScheduleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.CompensationSchedule

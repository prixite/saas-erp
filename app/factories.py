import factory
from faker import Faker

from app import models

fake = Faker()
fake.seed_instance(1234)


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.User

    @factory.post_generation
    def password(obj, create, extracted, **kwargs):
        if not create:
            return

        obj.set_password("admin")
        obj.save()


class OrganizationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Organization


class OrganizationModuleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.OrganizationModule


class EmployeeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Employee


class AssetTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.AssetType


class ModuleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Module


class RoleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Role


class UserModuleRoleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.UserModuleRole


class DepartmentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Department


class EmploymentTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.EmploymentType


class CurrencyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Currency


class CompensationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Compensation


class CompensationTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.CompensationType


class CompensationScheduleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.CompensationSchedule


class ProgramFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Program


class InstituteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Institute


class CompanyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Company


class DocumentTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.DocumentType


class LeaveFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Leave

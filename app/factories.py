import factory
from faker import Faker

from app import models

fake = Faker()
fake.seed_instance(1234)


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.User
        django_get_or_create = ("email",)

    @factory.post_generation
    def password(obj, create, extracted, **kwargs):
        if not create:
            return

        obj.set_password("admin")
        obj.save()


class OrganizationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Organization
        django_get_or_create = ("name",)


class OrganizationModuleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.OrganizationModule


class EmployeeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Employee
        django_get_or_create = ("nic",)


class AssetTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.AssetType


class ModuleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Module


class RoleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Role
        django_get_or_create = ("name", "organization")


class UserModuleRoleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.UserModuleRole


class DepartmentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Department
        django_get_or_create = ("name",)


class EmploymentTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.EmploymentType
        django_get_or_create = ("name",)


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


class TeamFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Team


class StandupFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Standup


class StandupUpdateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.StandupUpdate


class BenefitFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Benefit


class FolderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Folder


class DocumentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Document


class PayrollFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Payroll

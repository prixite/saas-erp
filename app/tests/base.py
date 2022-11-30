from django.test import TestCase

from app import factories, models
from app.tests.client import Client


class BaseTestCase(TestCase):
    def setUp(self) -> None:
        self.client = Client()

        self.super_user = factories.UserFactory(is_superuser=True)
        self.organization = factories.OrganizationFactory()
        self.owner_role = factories.RoleFactory(
            name="Employee Owner",
            permission=models.Role.Permission.ADMIN,
            is_default=True,
            organization=self.organization,
        )
        self.owner = factories.UserFactory(
            organization=self.organization, default_role=self.owner_role
        )
        self.employee_module = factories.ModuleFactory(
            name="Employee", slug=models.Module.ModuleType.EMPLOYEES, is_enabled=True
        )
        self.org_module = factories.OrganizationModuleFactory(
            module=self.employee_module, organization=self.organization, is_enabled=True
        )
        self.owner_employee_module = factories.UserModuleRoleFactory(
            module=self.employee_module,
            user=self.owner,
            role=self.owner_role,
        )
        self.org_user = factories.UserFactory(organization=self.organization)
        self.department = factories.DepartmentFactory(organization=self.organization)
        self.employment_type = factories.EmploymentTypeFactory(
            organization=self.organization
        )
        self.program = factories.ProgramFactory(organization=self.organization)
        self.institute = factories.InstituteFactory(organization=self.organization)
        self.compensation_type = factories.CompensationTypeFactory(
            organization=self.organization
        )
        self.compensation_schedule = factories.CompensationScheduleFactory(
            organization=self.organization
        )
        self.currency = factories.CurrencyFactory(organization=self.organization)

        factories.CurrencyFactory.create_batch(size=3)
        self.add_compensation_type_instances()
        self.add_compenstation_schedule_instances()

        self.employee = factories.EmployeeFactory(
            department=self.department,
            organization=self.organization,
            type=self.employment_type,
        )
        self.document_type = factories.DocumentTypeFactory(
            organization=self.organization
        )

        self.degree = factories.DegreeFactory(
            employee=self.employee, program=self.program, institute=self.institute
        )

        factories.DegreeFactory.create_batch(
            size=4,
            employee=self.employee,
            program=self.program,
            institute=self.institute,
        )

        factories.EmployeeFactory.create_batch(
            size=10,
            department=self.department,
            organization=self.organization,
            type=self.employment_type,
        )

    def add_compensation_type_instances(self):
        factories.CompensationTypeFactory(
            name="hourly",
            is_hourly=True,
            organization=self.organization,
        )
        factories.CompensationTypeFactory(
            name="monthly",
            is_monthly=True,
            organization=self.organization,
        )
        factories.CompensationTypeFactory(
            name="milestone",
            is_milestone=True,
            organization=self.organization,
        )

    def add_compenstation_schedule_instances(self):
        factories.CompensationScheduleFactory(
            name="monthly",
            is_monthly=True,
            organization=self.organization,
        )
        factories.CompensationScheduleFactory(
            name="weekly",
            is_weekly=True,
            organization=self.organization,
        )

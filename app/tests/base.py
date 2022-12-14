from django.test import TestCase

from app import factories, models
from app.tests.client import Client


class BaseTestCase(TestCase):
    def setUp(self) -> None:
        self.client = Client()

        self.super_user = factories.UserFactory(
            email="super-admin@example.com",
            username="super-admin@example.com",
            is_superuser=True,
        )
        self.organization = factories.OrganizationFactory(
            name="Test Organization", address="USA"
        )
        self.owner_role = factories.RoleFactory(
            name="Test Organization Owner",
            permission=models.Role.Permission.OWNER,
            is_default=True,
            organization=self.organization,
        )
        self.admin_role = factories.RoleFactory(
            name="Test Organization Admin",
            permission=models.Role.Permission.ADMIN,
            is_default=True,
            organization=self.organization,
        )
        self.member_role = factories.RoleFactory(
            name="Test Organization Member",
            permission=models.Role.Permission.MEMBER,
            is_default=True,
            organization=self.organization,
        )
        self.owner = factories.UserFactory(
            username="owner@example.com",
            email="owner@example.com",
            organization=self.organization,
            default_role=self.owner_role,
        )
        self.employee_module = factories.ModuleFactory(
            name="Employee", slug=models.Module.ModuleType.EMPLOYEES, is_enabled=True
        )
        self.employee_org_module = factories.OrganizationModuleFactory(
            module=self.employee_module, organization=self.organization, is_enabled=True
        )
        self.org_user = factories.UserFactory(
            username="user@example.com",
            email="user@example.com",
            organization=self.organization,
        )
        self.org_user_2 = factories.UserFactory(
            username="user2@example.com",
            email="user2@example.com",
            organization=self.organization,
        )
        self.user_employee_module_role = factories.UserModuleRoleFactory(
            module=self.employee_module, user=self.org_user, role=self.member_role
        )
        self.department = factories.DepartmentFactory(
            name="Frontend", organization=self.organization
        )
        self.employment_type = factories.EmploymentTypeFactory(
            name="Full time", organization=self.organization
        )
        self.program = factories.ProgramFactory(
            name="Bachelors", organization=self.organization
        )
        self.institute = factories.InstituteFactory(
            name="UET", organization=self.organization
        )
        self.currency = factories.CurrencyFactory(
            code="USD", symbol="$", organization=self.organization
        )
        self.company = factories.CompanyFactory(
            name="UET", organization=self.organization
        )
        self.document_type = factories.DocumentTypeFactory(
            name="Contracts", organization=self.organization
        )
        self.asset_type = factories.AssetTypeFactory(
            name="Laptop", organization=self.organization, attributes={}
        )
        self.compensation_type = factories.CompensationTypeFactory(
            name="Hourly",
            is_hourly=True,
            organization=self.organization,
        )
        self.compensation_schedule = factories.CompensationScheduleFactory(
            name="Monthly",
            is_monthly=True,
            organization=self.organization,
        )
        self.employee = factories.EmployeeFactory(
            user=self.org_user,
            nic="09233423143242",
            date_of_joining="2021-11-15",
            emergency_contact_number="+43223004234",
            designation="Software Engineer backend",
            organization=self.organization,
        )
        self.employee2 = factories.EmployeeFactory(
            user=self.org_user_2,
            nic="0923397121243242",
            date_of_joining="2020-11-15",
            emergency_contact_number="+43903004234",
            designation="Software Engineer frontend",
            organization=self.organization,
        )

        self.compensation = factories.CompensationFactory(
            rate="500",
            max_hours_per_week="10",
            expected_hours_per_week="5",
            compensation_type=self.compensation_type,
            compensation_schedule=self.compensation_schedule,
            currency=self.currency,
            employee=self.employee,
        )

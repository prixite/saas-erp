from django.core.management.base import BaseCommand
from django.db import transaction

from app import factories, models


class Command(BaseCommand):
    @transaction.atomic
    def handle(self, *args, **options):
        factories.UserFactory(
            is_superuser=True,
            is_staff=True,
            first_name="Super",
            last_name="Admin",
            email="super-admin@example.com",
            username="super admin",
        )
        organization = factories.OrganizationFactory(
            name="Test Organization", address="USA"
        )
        employee_module = factories.ModuleFactory(
            name="Employee", slug=models.Module.ModuleType.EMPLOYEES, is_enabled=True
        )
        factories.OrganizationModuleFactory(
            module=employee_module, organization=organization, is_enabled=True
        )
        owner_role = factories.RoleFactory(
            name="Test Organization Owner",
            permission=models.Role.Permission.OWNER,
            is_default=True,
            organization=organization,
        )
        member_role = factories.RoleFactory(
            name="Test Organization Member",
            permission=models.Role.Permission.MEMBER,
            is_default=True,
            organization=organization,
        )
        factories.UserFactory(
            first_name="Test",
            last_name="Owner",
            username="owner@example.com",
            email="owner@example.com",
            organization=organization,
            default_role=owner_role,
        )

        org_user = factories.UserFactory(
            first_name="Employee",
            last_name="One",
            username="employee1@example.com",
            email="employee1@example.com",
            organization=organization,
            default_role=member_role,
        )
        org_user_2 = factories.UserFactory(
            first_name="Employee",
            last_name="Two",
            username="employee2@example.com",
            email="employee2@example.com",
            organization=organization,
            default_role=member_role,
        )
        department = factories.DepartmentFactory(
            name="Frontend", organization=organization
        )
        employment_type = factories.EmploymentTypeFactory(
            name="Full time", organization=organization
        )

        factories.EmployeeFactory(
            user=org_user,
            nic="2530119091339",
            date_of_joining="2021-11-15",
            emergency_contact_number="43223004234",
            designation="Software Engineer backend",
            organization=organization,
            department=department,
            type=employment_type,
        )
        factories.EmployeeFactory(
            user=org_user_2,
            nic="3900119091120",
            date_of_joining="2020-11-15",
            emergency_contact_number="43903004234",
            designation="React js developer",
            organization=organization,
            department=department,
            type=employment_type,
        )

        self.stdout.write(self.style.SUCCESS("Data generated Successfully"))

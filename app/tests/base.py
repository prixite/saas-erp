from django.test import TestCase

from app import factories
from app.tests.client import Client


# Create your tests here.
class BaseTestCase(TestCase):
    def setUp(self) -> None:
        self.client = Client()

        self.super_user = factories.UserFactory(is_superuser=True)
        self.organization = factories.OrganizationFactory()
        self.org_user = factories.UserFactory(organization=self.organization)
        self.department = factories.DepartmentFactory(organization=self.organization)
        self.employment_type = factories.EmploymentType(
            organization=self.organization)
        self.employee = factories.EmployeeFactory(
            department=self.department, organization=self.organization, type=self.employment_type)

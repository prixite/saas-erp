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
        self.employee = factories.EmployeeFactory()
        factories.EmployeeFactory.create_batch(size=10)

from django.test import TestCase

from core import factories
from core.tests.client import Client

# Create your tests here.
class BaseTestCase(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        
        self.super_user = factories.UserFactory(is_superuser=True)
        organization = factories.OrganizationFactory()
        self.org_user = factories.UserFactory(organization=organization)
        self.employee = factories.EmployeeFactory()
        factories.EmployeeFactory.create_batch(size=10)

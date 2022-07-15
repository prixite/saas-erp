from django.utils import timezone
from rest_framework import status

from app import models
from app.tests.base import BaseTestCase


class EmployeeTestCase(BaseTestCase):
    def test_employee_list(self):
        self.client.force_login(self.super_user)
        response = self.client.get("/api/employees/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 11)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "name",
                "contact_number",
                "nic",
                "emergency_contact_number",
                "date_of_joining",
                "last_employer_salary_slip",
                "organization",
            ],
        )

    def test_employee_post(self):
        self.client.force_login(self.super_user)

        employee_data = {
            "name": "Waqar Ali",
            "contact_number": "0333 869 3455",
            "nic": "23470247027420",
            "emergency_contact_number": "0234324243",
            "date_of_joining": timezone.now().strftime("%Y-%m-%d"),
            "last_employer_salary_slip": True,
            "organization": self.organization.id,
        }

        response = self.client.post("/api/employees/", data=employee_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(models.Employee.objects.filter(**employee_data).exists())

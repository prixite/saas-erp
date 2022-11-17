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
                "id",
                "org_id",
                "first_name",
                "last_name",
                "contact_number",
                "date_of_joining",
                "avatar",
            ],
        )

    def test_employee_post(self):
        self.client.force_login(self.super_user)

        employee_data = {
            "user": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "user@example.com",
            },
            "contact_number": "234424432",
            "nic": "213342343242",
            "date_of_joining": "2022-11-15",
            "emergency_contact_number": "1234324234",
            "designation": "Software Engineer",
            "organization": self.organization.id,
        }

        response = self.client.post("/api/employees/", data=employee_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        employee_data.pop("user")
        self.assertTrue(models.Employee.objects.filter(**employee_data).exists())

    def test_employee_detail(self):
        self.client.force_login(self.super_user)
        response = self.client.get(f"/api/employees/{self.employee.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "user",
                "degrees",
                "experience",
                "benefits",
                "org_id",
                "contact_number",
                "nic",
                "date_of_joining",
                "emergency_contact_number",
                "designation",
                "user_allowed",
                "created_at",
                "updated_at",
                "organization",
                "department",
                "manager",
                "type",
            ],
        )


class CompensationTestCase(BaseTestCase):
    def test_compensation_list(self):
        self.client.force_login(self.super_user)
        response = self.client.get(f"/api/employees/{self.employee.id}/compensation/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class DocumentTestCase(BaseTestCase):
    def test_document_list(self):
        self.client.force_login(self.super_user)
        response = self.client.get(f"/api/employees/{self.employee.id}/documents/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

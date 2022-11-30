from rest_framework import status

from app import models
from app.tests.base import BaseTestCase


class EmployeeTestCase(BaseTestCase):
    def test_employee_list(self):
        self.client.force_login(self.owner)
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
                "image",
            ],
        )

    def test_employee_post(self):
        self.client.force_login(self.owner)

        employee_data = {
            "user": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "user@example.com",
                "contact_number": "234424432",
            },
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
        self.client.force_login(self.owner)
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
                "total_experience",
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
    def test_compensation_get(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/employees/{self.employee.id}/compensation/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_compensation_post(self):
        self.client.force_login(self.org_user)

        compensation_data = {
            "rate": "10",
            "max_hours_per_week": "5",
            "expected_hours_per_week": "5",
            "compensation_type": self.compensation_type.id,
            "compensation_schedule": self.compensation_schedule.id,
            "currency": self.currency.id,
        }

        self.client.post(
            f"/api/employees/{self.employee.id}/compensation/", data=compensation_data
        )
        self.assertTrue(
            models.Compensation.objects.filter(employee=self.employee.id).exists()
        )


class DocumentTestCase(BaseTestCase):
    def test_document_get(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/employees/{self.employee.id}/documents/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_document_post(self):
        self.client.force_login(self.owner)
        doc_data = {
            "name": "Experience letter",
            "type": self.document_type.id,
            "document_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",  # noqa
        }
        response = self.client.post(
            f"/api/employees/{self.employee.id}/documents/", data=doc_data
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class BenefitsTestCase(BaseTestCase):
    def test_document_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/benefits/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_document_post(self):
        self.client.force_login(self.owner)
        benefit_data = {"name": "PAid leaves"}
        response = self.client.post("/api/benefits/", data=benefit_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

from rest_framework import status

from app.tests.base import BaseTestCase


class UserTestCase(BaseTestCase):
    def test_verfiy_email(self):
        response = self.client.post(
            "/api/verify-email/", data={"email": "test_email@example.com"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_verfiy_email_negative(self):
        response = self.client.post(
            "/api/verify-email/", data={"email": "owner@example.com"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_onboarding(self):
        onboarding_data = {
            "first_name": "Test",
            "last_name": "Owner",
            "email": "test_onwer@gmail.com",
            "organization": {"name": "Test organization", "address": "USA"},
        }
        response = self.client.post("/api/owner/onboard/", data=onboarding_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

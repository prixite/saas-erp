from rest_framework import status

from app.tests.base import BaseTestCase


class MeTestCase(BaseTestCase):
    def test_me(self):
        self.client.force_login(self.org_user)
        response = self.client.get("/api/me/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "first_name",
                "last_name",
                "email",
                "organization",
                "avatar",
                "is_superuser",
                "headline",
                "contact_number"
            ],
        )

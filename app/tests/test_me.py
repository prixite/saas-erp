from app.tests.base import BaseTestCase
from rest_framework import status


class MeTestCase(BaseTestCase):
    def test_me(self):
        self.client.force_login(self.org_user)
        response = self.client.get(f"/api/me/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "first_name",
                "last_name",
                "email",
                "organization",
                "image",
                "is_superuser",
                "headline",
            ],
        )

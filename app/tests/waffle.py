from rest_framework import status

from app.tests.base import BaseTestCase


class WaffleTestCase(BaseTestCase):
    def test_me(self):
        self.client.force_login(self.super_user)
        response = self.client.get("/api/waffle/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "name",
                "active",
            ],
        )

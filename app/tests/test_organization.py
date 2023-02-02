from rest_framework import status

from app import models
from app.tests.base import BaseTestCase


class OrganizationTestCase(BaseTestCase):
    def test_organization_get(self):
        self.client.force_login(self.super_user)
        response = self.client.get("/api/organization/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_organization_post(self):
        self.client.force_login(self.super_user)
        organization_data = {"name": "Prixite", "address": "Pakistan"}
        response = self.client.post("/api/organization/", data=organization_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_organization_detail(self):
        self.client.force_login(self.super_user)
        response = self.client.get(f"/api/organization/{self.organization.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_organization_put(self):
        self.client.force_login(self.super_user)
        organization_data = {"name": "Netsol", "address": "Pakistan"}
        response = self.client.put(
            f"/api/organization/{self.organization.id}/", data=organization_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_organization_delete(self):
        self.client.force_login(self.super_user)
        response = self.client.delete(f"/api/organization/{self.organization.id}/")
        self.assertEqual(response.status_code, 400)


class ModuleTestCase(BaseTestCase):
    def test_module_get(self):
        self.client.force_login(self.super_user)
        response = self.client.get("/api/module/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_module_post(self):
        self.client.force_login(self.super_user)
        module_data = {
            "name": "User",
            "slug": models.Module.ModuleType.USER,
            "is_enabled": True,
        }
        response = self.client.post("/api/module/", data=module_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_module_detail(self):
        self.client.force_login(self.super_user)
        response = self.client.get(f"/api/module/{self.employee_module.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_module_put(self):
        self.client.force_login(self.super_user)
        module_data = {
            "name": "User",
            "slug": models.Module.ModuleType.USER,
            "is_enabled": True,
        }
        response = self.client.put(
            f"/api/module/{self.employee_module.id}/", data=module_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_module_delete(self):
        self.client.force_login(self.super_user)
        response = self.client.delete(f"/api/module/{self.employee_module.id}/")
        self.assertEqual(response.status_code, 400)


class OrganizationModuleTestCase(BaseTestCase):
    def test_organization_module_get(self):
        self.client.force_login(self.super_user)
        response = self.client.get("/api/organization-module/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_organization_module_post(self):
        self.client.force_login(self.super_user)
        organization_module_data = {
            "module": self.user_org_module.id,
            "organization": self.organization1.id,
            "is_enabled": True,
        }
        response = self.client.post(
            "/api/organization-module/", data=organization_module_data
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_organization_module_detail(self):
        self.client.force_login(self.super_user)
        response = self.client.get(
            f"/api/organization-module/{self.employee_org_module.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_organization_module_put(self):
        self.client.force_login(self.super_user)
        organization_module_data = {
            "module": self.employee_module.id,
            "organization": self.organization1.id,
            "is_enabled": True,
        }
        response = self.client.put(
            f"/api/organization-module/{self.employee_org_module.id}/",
            data=organization_module_data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_organization_module_delete(self):
        self.client.force_login(self.super_user)
        response = self.client.delete(
            f"/api/organization-module/{self.employee_org_module.id}/"
        )
        self.assertEqual(response.status_code, 204)

from rest_framework import status

from app import models
from app.tests.base import BaseTestCase


class FolderTestCase(BaseTestCase):
    def test_folder_post(self):
        self.client.force_login(self.owner)
        data = {"name": "Test Folder"}
        response = self.client.post("/api/folders/", data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(models.Folder.objects.filter(name=data["name"]).exists())

    def test_folder_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/folders/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            sorted(list(response.json()[0].keys())),
            sorted(
                [
                    "id",
                    "name",
                    "document_count",
                ]
            ),
        )

    def test_folder_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/folders/{self.folder.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            sorted(list(response.json().keys())),
            sorted(
                [
                    "id",
                    "name",
                    "documents",
                ]
            ),
        )

    def test_folder_put(self):
        self.client.force_login(self.owner)
        team_data = {
            "name": "Test Folder 2",
        }
        response = self.client.patch(f"/api/folders/{self.folder.id}/", data=team_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_folder_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/folders/{self.folder.id}/")
        self.assertEqual(response.status_code, 204)


class DocumentTestCase(BaseTestCase):
    def test_document_post(self):
        self.client.force_login(self.owner)
        data = {
            "title": "Test Document",
            "text": "string",
            "folder": self.folder.id,
            "document_link": "http://test.com",
            "created_by": self.super_user.id,
        }
        response = self.client.post("/api/documents/", data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(models.Document.objects.filter(title=data["title"]).exists())

    def test_document_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/documents/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            sorted(list(response.json()[0].keys())),
            sorted(["id", "title", "text", "folder", "document_link", "created_by"]),
        )

    def test_document_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/documents/{self.document.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            sorted(list(response.json().keys())),
            sorted(["id", "title", "text", "folder", "document_link", "created_by"]),
        )

    def test_document_put(self):
        self.client.force_login(self.owner)
        team_data = {
            "title": "Test Document 2",
        }
        response = self.client.patch(
            f"/api/documents/{self.document.id}/", data=team_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_document_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/documents/{self.document.id}/")
        self.assertEqual(response.status_code, 204)


class AWSTestCase(BaseTestCase):
    def test_aws_upload_file(self):
        self.client.force_login(self.owner)
        data = {"filename": "test", "filetype": ".jpg"}
        response = self.client.post("/api/aws_upload_file/", data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_aws_delete_upload_file(self):
        self.client.force_login(self.owner)
        response = self.client.delete("/api/aws_delete_file/key/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

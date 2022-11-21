from django.urls import path

from app.views import api

urlpatterns = [
    path(
        "employees/",
        api.EmployeeViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
    path(
        "employees/<int:pk>/",
        api.EmployeeViewSet.as_view(
            {
                "get": "retrieve",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "employees/<int:pk>/compensation/",
        api.CompensationViewSet.as_view(
            {
                "get": "retrieve",
            }
        ),
    ),
    path(
        "employees/<int:pk>/documents/",
        api.DocumentViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
    path(
        "institues/",
        api.InstitueApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "programs/",
        api.ProgramApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "degrees/",
        api.DegreeApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "companies/",
        api.CompanyApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "experiences/",
        api.ExperienceApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "benefits/",
        api.BenefitApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "me/",
        api.MeApiView.as_view(),
    ),
]

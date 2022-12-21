from django.urls import path

from app.views import api

urlpatterns = [
    path("token/", api.AuthTokenView.as_view(), name="obtain-auth-token"),
    path("refresh-token/", api.RefreshTokenView.as_view(), name="refresh-auth-token"),
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
                "put": "update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "employees/<int:pk>/compensation/",
        api.CompensationViewSet.as_view(
            {
                "get": "retrieve",
                "post": "create",
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
        "companies/",
        api.CompanyApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "benefits/",
        api.BenefitApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "department/",
        api.DepartmentApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "institues/",
        api.InstitueApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "asset_type/",
        api.AssetTypeApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "programs/",
        api.ProgramApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "employeement_type/",
        api.EmployeementTypeApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "compensation_type/",
        api.CompensationTypeApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "compensation_schedule/",
        api.CompensationScheduleApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "currency/",
        api.CurrencyApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "document_type/",
        api.DocumentTypeApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "role/",
        api.RoleApiView.as_view(),
    ),
    path(
        "me/",
        api.MeApiView.as_view(),
    ),
    path(
        "change_password/",
        api.UserPasswordViewSet.as_view(
            {
                "patch": "partial_update",
            }
        ),
    ),
    path(
        "flags/",
        api.WaffleApiView.as_view(),
    ),
    path(
        "attendance/",
        api.AttendanceViewSet.as_view(),
    ),
    path(
        "slack/attendance/",
        api.SlackApiView.as_view(),
    ),
    path("update-profile/<int:pk>/", api.UpdateProfileView.as_view()),
]

from django.contrib.auth import views as auth_views
from django.urls import path

from app.views import api

urlpatterns = [
    path("login/", api.LoginView.as_view()),
    path("logout/", auth_views.LogoutView.as_view(next_page="/")),
    path(
        "password-reset/",
        api.PasswordResetEmailView.as_view(),
        name="request-reset-email",
    ),
    path(
        "password-reset-confirm/",
        api.PasswordResetConfirmView.as_view(),
        name="password-reset-confirm",
    ),
    path(
        "password-reset-complete/",
        api.PasswordResetCompleteView.as_view(),
        name="password-reset-complete",
    ),
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
        "companies/<int:pk>/",
        api.CompanyApiView.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "benefits/",
        api.BenefitApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "benefits/<int:pk>/",
        api.BenefitApiView.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "department/",
        api.DepartmentApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "department/<int:pk>/",
        api.DepartmentApiView.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "institues/",
        api.InstitueApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "institues/<int:pk>/",
        api.InstitueApiView.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "asset_type/",
        api.AssetTypeApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "asset_type/<int:pk>/",
        api.AssetTypeApiView.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "programs/",
        api.ProgramApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "programs/<int:pk>/",
        api.ProgramApiView.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "employeement_type/",
        api.EmployeementTypeApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "employeement_type/<int:pk>/",
        api.EmployeementTypeApiView.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "compensation_type/",
        api.CompensationTypeApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "compensation_type/<int:pk>/",
        api.CompensationTypeApiView.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "compensation_schedule/",
        api.CompensationScheduleApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "compensation_schedule/<int:pk>/",
        api.CompensationScheduleApiView.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "currency/",
        api.CurrencyApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "currency/<int:pk>/",
        api.CurrencyApiView.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "document_type/",
        api.DocumentTypeApiView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "document_type/<int:pk>/",
        api.DocumentTypeApiView.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
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
        api.AttendanceViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "attendance/<int:pk>/",
        api.AttendanceViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "leave/",
        api.LeaveView.as_view({"get": "list"}),
    ),
    path(
        "leave/<int:pk>/",
        api.LeaveView.as_view(
            {
                "patch": "partial_update",
            }
        ),
    ),
    path(
        "slack/attendance/",
        api.SlackApiView.as_view(),
    ),
    path(
        "me/update/",
        api.MeUpdateViewSet.as_view(),
    ),
    path(
        "me-notification/update/",
        api.MeUpdateNotificationViewSet.as_view(),
    ),
    path(
        "owner/onboard/",
        api.OwnerOnboardingAPIView.as_view(),
    ),
    path(
        "organization/",
        api.OrganizationViewSet.as_view({"get": "list"}),
    ),
    path(
        "module/",
        api.ModuleViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
    path(
        "module/<int:pk>/",
        api.ModuleViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "organization-module/",
        api.OrganizationModuleViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
    path(
        "organization-module/<int:pk>/",
        api.OrganizationModuleViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "delete": "destroy",
            }
        ),
    ),
    path("standup/", api.StandupViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "standup/<int:pk>/",
        api.StandupViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path("standup/<int:pk>/members/", api.StandupViewSet.as_view({"get": "retrieve"})),
    path(
        "standup_update/",
        api.StandupUpdateViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "standup_update/<int:pk>/",
        api.StandupUpdateViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "team/",
        api.TeamViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "team/<int:pk>/",
        api.TeamViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path("team/<int:pk>/members/", api.TeamViewSet.as_view({"get": "retrieve"})),
    path(
        "users/<int:pk>/access/",
        api.UserModuleRoleViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "users/access/<int:pk>/",
        api.UserModuleRoleViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "delete": "destroy",
            }
        ),
    ),
    path("organization_modules/", api.ModuleFilterViewSet.as_view({"get": "list"})),
    path("users/", api.UserViewSet.as_view({"get": "list"})),
    path("organization_roles/", api.RoleFilterViewSet.as_view({"get": "list"})),
]

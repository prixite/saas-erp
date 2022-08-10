"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path, re_path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from app.views.api import HomeView

accounts = [
    path(
        "accounts/login/",
        auth_views.LoginView.as_view(
            template_name="app/html/registration/login.html",
        ),
        name="login",
    ),
    path(
        "accounts/logout/",
        auth_views.LogoutView.as_view(next_page=settings.LOGIN_URL),
        name="logout",
    ),
    path(
        "accounts/password_change/",
        auth_views.PasswordChangeView.as_view(
            template_name="app/html/registration/password_change_form.html"
        ),
        name="password_change",
    ),
    path(
        "accounts/password_change/done/",
        auth_views.PasswordChangeDoneView.as_view(
            template_name="app/html/registration/password_change_done.html"
        ),
        name="password_change_done",
    ),
    path(
        "accounts/password_reset/",
        auth_views.PasswordResetView.as_view(
            template_name="app/html/registration/password_reset_form.html",
            email_template_name="app/html/emails/password_reset_email.html",
            subject_template_name="app/html/emails/password_reset_subject.txt",
        ),
        name="password_reset",
    ),
    path(
        "accounts/password_reset/done/",
        auth_views.PasswordResetDoneView.as_view(
            template_name="app/html/registration/password_reset_done.html"
        ),
        name="password_reset_done",
    ),
    path(
        "accounts/reset/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(
            template_name="app/html/registration/password_reset_confirm.html"
        ),
        name="password_reset_confirm",
    ),
    path(
        "accounts/reset/done/",
        auth_views.PasswordResetCompleteView.as_view(
            template_name="app/html/registration/account_reset_done.html"
        ),
        name="password_reset_complete",
    ),
]


urlpatterns = accounts + [
    path("admin/", admin.site.urls),
    path("api/", include("app.urls.api")),
    path("docs/schema/", SpectacularAPIView.as_view(), name="schema_docs"),
    path(
        "docs/api/",
        SpectacularSwaggerView.as_view(url_name="schema_docs"),
        name="api_docs",
    ),
    path("react/", HomeView.as_view(), name="home"),
    re_path(r"^react/.+/$", HomeView.as_view(), name="home"),
    path("", include("app.urls.html")),
]

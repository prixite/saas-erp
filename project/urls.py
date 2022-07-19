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
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from app.views import HomeView

accounts = [
    path(
        "accounts/login/",
        auth_views.LoginView.as_view(template_name="app/html/registration/login.html"),
        name="login",
    ),
    path(
        "accounst/password_change/",
        auth_views.PasswordChangeView.as_view(),
        name="password_change",
    ),
    path(
        "accounts/password_change/done/",
        auth_views.PasswordChangeDoneView.as_view(),
        name="password_change_done",
    ),
]


urlpatterns = accounts + [
    path("admin/", admin.site.urls),
    path("api/", include("app.urls.api")),
    path("html/", include("app.urls.html")),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "openapi/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="open-api",
    ),
    path("", HomeView.as_view(), name="home"),
]

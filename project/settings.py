"""
Django settings for app project.

Generated by 'django-admin startproject' using Django 4.0.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

import os
import pathlib
from pathlib import Path

import dj_database_url
import environ
from django.contrib.messages import constants as messages

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
env = environ.Env(
    SECRET_KEY=(str, ""),
    DEBUG=(bool, True),
    ALLOWED_HOSTS=(list, []),
    DATABASE_URL=(str, ""),
    CSRF_TRUSTED_ORIGINS=(list, ["https://erp.prixite.com"]),
    EMAIL_BACKEND=(str, "django.core.mail.backends.console.EmailBackend"),
    EMAIL_HOST=(str, None),
    EMAIL_PORT=(int, 587),
    EMAIL_USE_TLS=(bool, True),
    EMAIL_HOST_USER=(str, None),
    EMAIL_HOST_PASSWORD=(str, None),
    DEFAULT_FROM_EMAIL=(str, "no-reply@prixite.com"),
    DOMAIN_NAME=(str, "https://erp.prixite.com"),
)
environ.Env.read_env(pathlib.Path(BASE_DIR).joinpath(".env"))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

ALLOWED_HOSTS = env("ALLOWED_HOSTS")

CSRF_TRUSTED_ORIGINS = env("CSRF_TRUSTED_ORIGINS")

DOMAIN_NAME = env("DOMAIN_NAME")

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    # Internal Apps
    "app",
    # 3rd party apps
    "rest_framework",
    "drf_spectacular",
    "crispy_forms",
    "crispy_bootstrap5",
    "webpack_loader",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "app.context_processors.accessible_modules",
            ],
        },
    },
]

WSGI_APPLICATION = "project.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

if env("DATABASE_URL"):
    DATABASES = {"default": dj_database_url.parse(env("DATABASE_URL"))}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",  # noqa
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",  # noqa
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",  # noqa
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",  # noqa
    },
]

AUTH_USER_MODEL = "app.User"


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = "static/"
STATIC_ROOT = "static/"
STATICFILES_DIRS = [BASE_DIR / "frontend/dist/"]

MEDIA_URL = "/media/"
MEDIA_ROOT = "media"

EMAIL_BACKEND = env("EMAIL_BACKEND")
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_USE_TLS = env("EMAIL_USE_TLS")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL")

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

LOGIN_REDIRECT_URL = "/"

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

SPECTACULAR_SETTINGS = {
    "TITLE": "The AI powered ERP",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "SWAGGER_UI_SETTINGS": {
        "deepLinking": True,
        "persistAuthorization": True,
        "displayOperationId": True,
    },
    "SWAGGER_UI_DIST": "//unpkg.com/swagger-ui-dist@3.35.1",
}

CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap5"
CRISPY_TEMPLATE_PACK = "bootstrap5"


MESSAGE_TAGS = {
    messages.DEBUG: "alert-secondary",
    messages.INFO: "alert-info",
    messages.SUCCESS: "alert-success",
    messages.WARNING: "alert-warning",
    messages.ERROR: "alert-danger",
}


SITE_ID = 1


WEBPACK_LOADER = {
    "DEFAULT": {
        "CACHE": not DEBUG,
        "STATS_FILE": os.path.join(BASE_DIR, "webpack-stats.json"),
        "POLL_INTERVAL": 0.1,
        "IGNORE": [r".+\.hot-update.js", r".+\.map"],
    }
}

DATE_INPUT_FORMATS = ("%d/%m/%y",)

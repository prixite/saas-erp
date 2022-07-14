import factory

from app import models


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.User

    @factory.post_generation
    def password(obj, create, extracted, **kwargs):
        if not create:
            return

        obj.set_password("admin")
        obj.save()

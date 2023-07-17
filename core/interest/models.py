from django.db import models
from core.user.models import User


class InterestManager(models.Manager):
    pass


class Interest(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    objects = InterestManager()

    def __str__(self):
        return self.name

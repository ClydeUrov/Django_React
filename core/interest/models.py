import uuid
from django.db import models
from core.abstract import AbstractManager, AbstractModel


class InterestManager(models.Manager):
    pass


class Interest(models.Model):
    author = models.ForeignKey("core_user.User", on_delete=models.CASCADE)
    interest = models.CharField(max_length=100, default="")

    objects = InterestManager()

    def __str__(self):
        return self.author.name

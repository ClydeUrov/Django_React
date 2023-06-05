from django.db import models
from rest_framework.exceptions import ValidationError

from core.abstract import AbstractModel, AbstractManager


def post_directory_path(instance, filename):
    print(instance)
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'post_{0}/{1}'.format(instance.post_id, filename)


class PostManager(AbstractManager):
    pass


class Post(AbstractModel):
    author = models.ForeignKey(to="core_user.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default="")
    body = models.TextField()
    images = models.ImageField(upload_to=post_directory_path, blank=True, null=True)
    event_date = models.DateTimeField(null=True, blank=True)
    event_duration = models.DurationField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    contacts = models.CharField(max_length=255, blank=True, null=True)
    edited = models.BooleanField(default=False)

    objects = PostManager()

    def clean(self):
        # Проверка наличия хотя бы одного из полей
        if not self.event_date and not self.event_duration:
            raise ValidationError("Необходимо указать дату мероприятия или его продолжительность.")

    def __str__(self):
        return f"{self.author.name}"

from django.db import models

from core.abstract import AbstractModel, AbstractManager


class RoomManager(AbstractManager):
    pass


class Room(AbstractModel):
    """Модель комнаты чата"""
    creator = models.ForeignKey("core_user.User", verbose_name="Creator", on_delete=models.CASCADE)
    invited = models.ManyToManyField("core_user.User", verbose_name="Participant", related_name="invited_user")
    date = models.DateTimeField("Date of creation", auto_now_add=True)

    objects = RoomManager()

    class Meta:
        verbose_name = "Chat room"
        verbose_name_plural = "Chat rooms"


class ChatManager(AbstractManager):
    pass


class Chat(models.Model):
    """Модель чата"""
    room = models.ForeignKey(Room, verbose_name="Chat room", on_delete=models.CASCADE)
    user = models.ForeignKey("core_user.User", verbose_name="User", on_delete=models.CASCADE)
    text = models.TextField("Message", max_length=500)
    created = models.DateTimeField("Дата отправки", auto_now_add=True)
    updated = models.BooleanField(default=False)
    read = models.BooleanField(default=False)

    objects = ChatManager()

    class Meta:
        verbose_name = "Chat message"
        verbose_name_plural = "Chat messages"

from django.db import models

from core.abstract import AbstractModel, AbstractManager


class RoomManager(AbstractManager):
    pass


class Room(AbstractModel):
    """Модель комнаты чата"""
    creator = models.ForeignKey(
        "core_user.User",
        related_name="created_rooms",
        verbose_name="Creator",
        on_delete=models.CASCADE
    )
    invited = models.ForeignKey(
        "core_user.User",
        related_name="invited_rooms",
        verbose_name="Invited",
        on_delete=models.CASCADE,
    )

    objects = RoomManager()

    class Meta:
        verbose_name = "Chat room"
        verbose_name_plural = "Chat rooms"


class MessageManager(AbstractManager):
    pass


class Message(models.Model):
    """Модель чата"""
    room = models.ForeignKey(Room, verbose_name="Chat room", on_delete=models.CASCADE)
    author = models.ForeignKey("core_user.User", verbose_name="User", on_delete=models.CASCADE)
    text = models.TextField("Message", max_length=500)
    created = models.DateTimeField("Дата отправки", auto_now_add=True)
    updated = models.BooleanField(default=False)
    read = models.BooleanField(default=False)

    objects = MessageManager()

    class Meta:
        verbose_name = "Chat message"
        verbose_name_plural = "Chat messages"

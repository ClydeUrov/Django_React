from rest_framework import serializers

from core.chat_room.models import Room, Chat
from core.user.models import User
from core.abstract import AbstractSerializer
from core.user.serializers import UserSerializer


class RoomSerializer(AbstractSerializer):
    creator = UserSerializer()
    invited = UserSerializer(many=True)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        author = User.objects.get_object_by_public_id(rep['author'])
        rep['author'] = UserSerializer(author, context=self.context).data
        return rep

    class Meta:
        model = Room
        fields = ["id", "creator", "invited", "date", "created", "updated"]


class ChatSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        user = User.objects.get_object_by_public_id(rep['user'])
        rep['user'] = UserSerializer(user, context=self.context).data
        return rep

    class Meta:
        model = Chat
        fields = ["id", "room", "user", "text", "read", "created", "updated"]

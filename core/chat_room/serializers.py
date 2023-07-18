from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.chat_room.models import Room, Chat
from core.user.models import User
from core.abstract import AbstractSerializer
from core.user.serializers import UserSerializer


class RoomSerializer(AbstractSerializer):
    creator = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')
    invited = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id', many=True)
    
    def validate_creator(self, value):
        if self.context["request"].user != value:
            raise ValidationError("You can`t create a room for another user.")

        return value

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        creator = User.objects.get_object_by_public_id(rep['creator'])
        rep['creator'] = UserSerializer(creator, context=self.context).data
        return rep

    class Meta:
        model = Room
        fields = ["id", "creator", "invited", "date", "created", "updated"]


class ChatSerializer(serializers.ModelSerializer):
    room = serializers.SlugRelatedField(queryset=Room.objects.all(), slug_field='public_id')
    user = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        user = User.objects.get_object_by_public_id(rep['user'])
        rep['user'] = UserSerializer(user, context=self.context).data
        return rep

    class Meta:
        model = Chat
        fields = ["id", "room", "user", "text", "read", "created", "updated"]

from rest_framework import serializers
from rest_framework.exceptions import ValidationError, PermissionDenied

from core.chat_room.models import Room, Message
from core.user.models import User
from core.abstract import AbstractSerializer
from core.user.serializers import UserSerializer


class RoomSerializer(AbstractSerializer):
    creator = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')
    invited = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')
    
    def validate_creator(self, value):
        if self.context["request"].user != value:
            raise ValidationError("You can`t create a room.")
        return value

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        creator = User.objects.get_object_by_public_id(rep['creator'])
        rep['creator'] = UserSerializer(creator, context=self.context).data

        invited = User.objects.get_object_by_public_id(rep['invited'])
        rep['invited'] = UserSerializer(invited, context=self.context).data
        return rep

    class Meta:
        model = Room
        fields = ["id", "creator", "invited", "created", "updated"]


class MessageSerializer(serializers.ModelSerializer):
    room = serializers.SlugRelatedField(queryset=Room.objects.all(), slug_field='public_id')
    author = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')

    def create(self, validated_data):
        room = validated_data['room']
        author = self.context["request"].user

        if author == room.creator or room.invited:
            return Message.objects.create(**validated_data)
        else:
            raise PermissionDenied("You are not allowed to send messages to this room.")

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        author = User.objects.get_object_by_public_id(rep['author'])
        rep['author'] = UserSerializer(author, context=self.context).data
        return rep

    class Meta:
        model = Message
        fields = ["id", "room", "author", "text", "read", "created", "updated"]

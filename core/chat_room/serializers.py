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
            raise ValidationError("You can`t create a room.")
        return value

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        creator = User.objects.get_object_by_public_id(rep['creator'])
        rep['creator'] = UserSerializer(creator, context=self.context).data

        invited = User.objects.filter(public_id__in=rep['invited'])
        rep['invited'] = UserSerializer(invited, many=True, context=self.context).data
        return rep

    class Meta:
        model = Room
        fields = ["id", "creator", "invited", "created", "updated"]


class ChatSerializer(serializers.ModelSerializer):
    room = serializers.SlugRelatedField(queryset=Room.objects.all(), slug_field='public_id')
    author = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')

    def create(self, validated_data):
        room = validated_data['room']
        author = self.context["request"].user

        invited_users_exist = room.invited.filter(public_id=author.public_id).exists()
        if not invited_users_exist and author != room.creator:
            raise ValidationError("You can't create a message in this room.")

        return Chat.objects.create(**validated_data)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        author = User.objects.get_object_by_public_id(rep['author'])
        rep['author'] = UserSerializer(author, context=self.context).data
        return rep

    class Meta:
        model = Chat
        fields = ["id", "room", "author", "text", "read", "created", "updated"]

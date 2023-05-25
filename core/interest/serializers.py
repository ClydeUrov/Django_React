from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.abstract import AbstractSerializer
from core.interest.models import Interest
from core.user.models import User
from core.user.serializers import UserSerializer


class InterestSerializer(AbstractSerializer):
    def validate_author(self, value):
        if self.context["request"].user != value:
            raise ValidationError("You can`t create a post for another user.")
        return value

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        author = User.objects.get_user_by_public_id(rep['author'])
        rep['author'] = UserSerializer(author, context=self.context).data
        print(rep)
        return rep

    class Meta:
        model = Interest
        field = '__all__'


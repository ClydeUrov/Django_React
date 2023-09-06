# from django.conf import settings
from rest_framework import serializers

from CoreRoot import settings
from core.abstract import AbstractSerializer
from core.user.models import User, Interest


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'name']


class UserSerializer(AbstractSerializer):
    posts_count = serializers.SerializerMethodField()
    interests = InterestSerializer(many=True)

    def get_posts_count(self, instance):
        return instance.post_set.all().count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation['avatar']:
            representation['avatar'] = settings.DEFAULT_AVATAR_URL
        if settings.DEBUG:
            request = self.context.get('request')
            representation['avatar'] = request.build_absolute_uri(representation['avatar'])
        return representation

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'bio', 'avatar', 'interests',
                  'email', 'is_active', 'posts_count', 'created', 'updated']
        read_only_fields = ['is_active']
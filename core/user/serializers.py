# from django.conf import settings
from rest_framework import serializers

from CoreRoot import settings
from core.abstract import AbstractSerializer
from core.user.models import User, Interest


class UserSerializer(AbstractSerializer):
    posts_count = serializers.SerializerMethodField()
    interests = serializers.SerializerMethodField()

    def get_posts_count(self, instance):
        return instance.post_set.all().count()

    def get_interests(self, instance):
        return [interest.name for interest in instance.interests.all()]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        interests = self.get_interests(instance)
        representation['interests'] = interests  # Добавляем интересы в представление
        if not representation['avatar']:
            representation['avatar'] = settings.DEFAULT_AVATAR_URL
        if settings.DEBUG:
            request = self.context.get('request')
            representation['avatar'] = request.build_absolute_uri(representation['avatar'])
        return representation

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'bio', 'avatar', 'interests', 'email', 'is_active', 'posts_count', 'created', 'updated']
        read_only_fields = ['is_active']
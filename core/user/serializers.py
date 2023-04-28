# from django.conf import settings
from rest_framework import serializers

from CoreRoot import settings
from core.abstract import AbstractSerializer
from core.user.models import User


class UserSerializer(AbstractSerializer):
    # id = serializers.UUIDField(source='public_id', read_only=True, format='hex')
    # created = serializers.DateTimeField(read_only=True)
    # updated = serializers.DateTimeField(read_only=True)
    posts_count = serializers.SerializerMethodField()

    def get_posts_count(self, instance):
        return instance.post_set.all().count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation['avatar']:
            representation['avatar'] = settings.DEFAULT_AVATAR_URL
            return representation
        if settings.DEBUG:  # debug enabled for dev
            request = self.context.get('request')
            representation['avatar'] = request.build_absolute_url(representation['avatar'])
            return representation

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'bio',
                  'avatar', 'email', 'is_active', 'posts_count', 'created', 'updated']
        read_only_field = ['is_active']

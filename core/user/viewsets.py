from rest_framework.permissions import IsAuthenticated

from core.abstract import AbstractViewSet
from core.auth.permissions import UserPermission
from core.user.models import User, Interest
from core.user.serializers import UserSerializer


class UserViewSet(AbstractViewSet):
    http_method_names = ('patch', 'get')
    permission_classes = (IsAuthenticated, UserPermission,)
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.exclude(is_superuser=True)

    def get_serializer_context(self):
        return {'request': self.request}

    def get_object(self):
        obj = User.objects.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)

        interests_data = self.request.data.get("interests", [])

        interests = [Interest.objects.get_or_create(name=interest_name)[0] for interest_name in interests_data]

        obj.interests.set(interests)
        return obj


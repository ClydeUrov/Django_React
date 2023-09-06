from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response

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
        return obj

    @action(methods=['patch'], detail=True)
    def add_interest(self, request, pk=None):
        user = self.get_object()
        interest_name = request.data.get('interest_name')
        interest, created = Interest.objects.get_or_create(name=interest_name)
        user.add_interest(interest)

        serializer = self.serializer_class(user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['patch'], detail=True)
    def remove_interest(self, request, pk=None):
        user = self.get_object()
        interest_name = request.data.get('interest_name')
        try:
            interest = Interest.objects.get(name=interest_name)
            user.remove_interest(interest)

            serializer = self.serializer_class(user, context={'request': request})
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        except Interest.DoesNotExist:
            return Response({'status': 'Interest not found or removed'})

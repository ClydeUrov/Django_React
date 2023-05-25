from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from core.abstract import AbstractViewSet
from core.auth.permissions import UserPermission
from core.interest.models import Interest
from core.interest.serializers import InterestSerializer
from django.core.cache import cache


class InterestViewSet():
    http_method_names = ('get', 'put', 'delete')
    permission_classes = UserPermission
    serializer_class = InterestSerializer

    def get_queryset(self):
        return Interest.objects.all()

    def get_object(self):
        obj = Interest.objects.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

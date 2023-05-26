from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from core.abstract import AbstractViewSet
from core.auth.permissions import UserPermission
from core.interest.models import Interest
from core.interest.serializers import InterestSerializer
from django.core.cache import cache


class InterestViewSet(AbstractViewSet):
    http_method_names = ('get', 'put', 'delete')
    permission_classes = UserPermission
    serializer_class = InterestSerializer

    def get_queryset(self):
        return Interest.objects.all()

    def interests(self, request, *args, **kwargs):
        interest_objects = cache.get("interest_objects")

        if interest_objects is None:
            post_objects = self.filter_queryset(self.get_queryset())
            cache.set("interest_objects", post_objects)

        page = self.paginate_queryset(interest_objects)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(interest_objects, many=True)
        return Response(serializer.data)

from django.http import Http404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from core.abstract import AbstractViewSet
from core.auth.permissions import UserPermission
from core.interest.models import Interest
from core.interest.serializers import InterestSerializer
from django.core.cache import cache


class InterestViewSet(AbstractViewSet):
    http_method_names = ('get', 'post', 'put', 'delete')
    permission_classes = (UserPermission, )
    serializer_class = InterestSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Interest.objects.all()
        user_pk = self.kwargs['user_pk']

        if user_pk is None:
            return Http404
        queryset = Interest.objects.filter(author__public_id=user_pk)
        return queryset

    def get_object(self):
        obj = Interest.objects.get(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def destroy(self, request, *args, **kwargs):
        obj = Interest.objects.filter(interest=self.kwargs['pk']).first()
        self.check_object_permissions(self.request, obj)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        interest_objects = cache.get("interest_objects")

        if interest_objects is None:
            interest_objects = self.filter_queryset(self.get_queryset())
            cache.set("interest_objects", interest_objects)

        page = self.paginate_queryset(interest_objects)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(interest_objects, many=True)
        return Response(serializer.data)

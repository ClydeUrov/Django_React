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
    http_method_names = ('get', 'post', 'delete')
    permission_classes = (UserPermission, )
    serializer_class = InterestSerializer

    def get_queryset(self):
        user_pk = self.kwargs['user_pk']
        print("user_pk", user_pk)
        if user_pk is None:
            return Http404
        queryset = Interest.objects.filter(author__public_id=user_pk)
        return queryset

    def destroy(self, request, *args, **kwargs):
        print(self.kwargs['pk'])
        interest = Interest.objects.get(pk=self.kwargs['pk'])
        print(interest)
        if interest:
            self.check_object_permissions(self.request, interest)
            interest.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif interest is None:
            return Http404

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        interest_objects = Interest.objects.filter(author=request.user)
        cache.set("interest_objects", interest_objects)
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

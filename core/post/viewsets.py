from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from core.abstract import AbstractViewSet
from core.auth.permissions import UserPermission
from core.post.models import Post
from core.post.serializers import PostSerializer
from django.core.cache import cache

from core.user.models import User


class PostViewSet(AbstractViewSet):
    http_method_names = ('get', 'post', 'put', 'delete')
    permission_classes = (UserPermission, )
    serializer_class = PostSerializer
    filterset_fields = ['author__public_id']

    def get_queryset(self):
        return Post.objects.all()

    def get_object(self):
        obj = Post.objects.get_object_by_public_id(self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj

    def list(self, request, *args, **kwargs):
        author_public_id = request.query_params.get("author__public_id")
        # post_objects = cache.get("post_objects")
        if author_public_id:
            author = get_object_or_404(User, public_id=author_public_id)
            post_objects = Post.objects.filter(author=author)
            cache.set("post_objects", post_objects)
        else:
            post_objects = self.filter_queryset(self.get_queryset())
            cache.set("post_objects", post_objects)

        page = self.paginate_queryset(post_objects)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(post_objects, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=True)
    def like(self, request, *args, **kwargs):
        post = self.get_object()
        user = self.request.user
        user.like(post)
        serializer = self.serializer_class(post, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def remove_like(self, request, *args, **kwargs):
        post = self.get_object()
        user = self.request.user
        user.remove_like(post)

        serializer = self.serializer_class(post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def map(self, request, *args, **kwargs):
        post = self.get_object()

        serializer = self.serializer_class(post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

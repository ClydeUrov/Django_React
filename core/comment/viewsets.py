from django.http.response import Http404

from rest_framework.response import Response
from rest_framework import status

from core.abstract.viewsets import AbstractViewSet
from core.comment.models import Comment
from core.comment.serializers import CommentSerializer
from core.auth.permissions import UserPermission


class PostViewSet(AbstractViewSet):
    http_method_names = ('get', 'post', 'put', 'delete')
    permission_classes = (UserPermission, )
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.all()

    def get_object(self):
        obj = Comment.objects.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

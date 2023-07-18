from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.abstract import AbstractViewSet
from core.chat_room.models import Room, Chat
from core.chat_room.serializers import RoomSerializer, ChatSerializer
from core.user.models import User


class RoomViewSet(AbstractViewSet):
    http_method_names = ("get", "post", "delete")
    permission_classes = (IsAuthenticated, )
    serializer_class = RoomSerializer

    def get_queryset(self):
        return Room.objects.all()

    def get_object(self):
        obj = Room.objects.get_object_by_public_id(self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj

    def list(self, request, *args, **kwargs):
        creator_id = request.query_params.get("creator__public_id")

        if creator_id:
            author = get_object_or_404(User, public_id=creator_id)
            room = Room.objects.filter(author=author)
        else:
            room = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(room)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(room, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ChatViewSet(AbstractViewSet):
    http_method_names = ("get", "post", "put", "delete")
    permission_classes = (IsAuthenticated, )
    serializer_class = ChatSerializer

    def get_queryset(self):
        room_pk = self.kwargs['room_pk']
        if room_pk is None:
            return Chat.objects.null()
        return Chat.objects.filter(room__public_id=room_pk)

    def get_object(self):
        obj = Chat.objects.get_object_by_public_id(self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj

    def list(self, request, *args, **kwargs):
        room_id = request.query_params.get("room__public_id")

        if room_id:
            author = get_object_or_404(User, public_id=room_id)
            room = Room.objects.filter(author=author)
        else:
            room = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(room)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(room, many=True)
        return Response(serializer.data)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

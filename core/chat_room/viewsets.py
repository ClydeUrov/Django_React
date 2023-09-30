from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.abstract import AbstractViewSet
from core.auth.permissions import UserPermission
from core.chat_room.models import Room, Message
from core.chat_room.serializers import RoomSerializer, MessageSerializer
from core.user.models import User


class RoomViewSet(AbstractViewSet):
    http_method_names = ("get", "post", "delete")
    permission_classes = (IsAuthenticated, UserPermission)
    serializer_class = RoomSerializer

    def get_queryset(self):
        user = self.request.user
        return Room.objects.filter(creator=user) | Room.objects.filter(invited=user)

    def get_object(self):
        obj = Room.objects.get_object_by_public_id(self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj

    def list(self, request, *args, **kwargs):
        creator_id = request.query_params.get("creator")
        invited_id = request.query_params.get("invited")
        print(creator_id, invited_id)

        if creator_id and invited_id:
            try:
                room = Room.objects.get(creator__public_id=creator_id, invited__public_id=invited_id) \
                       or \
                       Room.objects.get(creator__public_id=invited_id, invited__public_id=creator_id)
                serializer = self.get_serializer(room)
                return Response(serializer.data)
            except Room.DoesNotExist as ex:
                print("Room does not exist", ex)
                return Response({})
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


class MessageViewSet(AbstractViewSet):
    http_method_names = ("get", "post", "put", "delete")
    permission_classes = (IsAuthenticated, )
    serializer_class = MessageSerializer

    def get_queryset(self):
        room_pk = self.kwargs['room_pk']
        if room_pk is None or room_pk == 'undefined':
            raise NotFound("Room not found")
        return Message.objects.filter(room__public_id=room_pk)

    def get_object(self):
        obj = Message.objects.get(id=self.kwargs["pk"])
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

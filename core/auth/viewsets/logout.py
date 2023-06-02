from rest_framework import status, viewsets, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from core.auth.permissions import UserPermission


class LogoutViewSet(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        refresh = request.data.get("refresh")
        if refresh is None:
            raise ValidationError({"detail": "A refresh token is required."})

        try:
            token = RefreshToken(request.data.get("refresh"))
            token.blacklist()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TokenError:
            raise ValidationError({"detail": "The refresh token is invalid."})
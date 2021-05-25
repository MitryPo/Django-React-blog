from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from .serializers import UserRegisterSerialzer, UserUpdateSerialzer
from .models import User


class UserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id


class UserRegister(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = UserRegisterSerialzer


class UserAccount(generics.GenericAPIView):

    serializer_class = UserUpdateSerialzer
    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        user = User.objects.get(pk=self.request.user.id)
        serializer = UserUpdateSerialzer(user)
        if user:
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def patch(self, request):
        user = User.objects.get(pk=self.request.user.id)
        serializer = UserUpdateSerialzer(user, data=request.data)
        if user and serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = User.objects.get(pk=self.request.user.id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
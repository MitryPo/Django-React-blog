from rest_framework import serializers
from .models import User


class UserRegisterSerialzer(serializers.ModelSerializer):

    email = serializers.EmailField()
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )
    token = serializers.CharField(max_length=256, read_only=True)

    class Meta:
        model = User
        fields = [
            'email',
            'password',
            'token'
        ]
        read_only_fields = ('token',)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
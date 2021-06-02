from rest_framework import serializers
from blog.models import Category, Post


class PostSerialzer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field='user_name', read_only=True)
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'


class PostCreateSerialzer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Post
        exclude = ['id', 'slug', 'published']


class CategorySerialzer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
from rest_framework import generics
from rest_framework import permissions
from blog.models import Post
from .serializers import PostSerialzer, PostCreateSerialzer
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticatedOrReadOnly, SAFE_METHODS, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter


class PostUserWritePermission(BasePermission):
    message = 'Редактирование публикаций доступно только их автору'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


class PostList(generics.ListAPIView):
    filter_backends = [DjangoFilterBackend,]
    filterset_fields = ['category__slug']
    serializer_class = PostSerialzer
    queryset = Post.postobjects.all().order_by('-published')


class SearchPosts(generics.ListAPIView):
    filter_backends = [SearchFilter,]
    search_fields = ['$title', '$content']
    serializer_class = PostSerialzer
    queryset = Post.postobjects.all().order_by('-published')


class MyPostList(generics.ListAPIView):
    serializer_class = PostSerialzer
    permission_classes = [PostUserWritePermission,]
    filter_backends = [DjangoFilterBackend,]
    filterset_fields = ['category__slug', 'status']

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user.id)
        

class PostCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = PostCreateSerialzer
    queryset = Post.objects.all()


class PostDetail(generics.RetrieveAPIView):
    serializer_class = PostSerialzer
    lookup_field='slug'
    queryset = Post.objects.all()


class PostAdminDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [PostUserWritePermission,]
    serializer_class = PostCreateSerialzer
    lookup_field='slug'
    queryset = Post.objects.all()

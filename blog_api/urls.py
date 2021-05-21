from django.urls import path
from .views import MyPostList, PostDetail, PostAdminDetail, PostList, PostCreate, SearchPosts

app_name = 'blog_api'

urlpatterns = [
    path('', PostList.as_view(), name='getall'),
    path('search/', SearchPosts.as_view(), name='search'),
    path('my/', MyPostList.as_view(), name='getmy'),
    path('detail/<str:slug>/', PostDetail.as_view(), name='detail'),
    path('edit/<str:slug>/', PostAdminDetail.as_view(), name='edit'),
    path('create/', PostCreate.as_view(), name='create')
]
from django.urls import path
from . import views


urlpatterns = [
    path('categories/', views.CategoryView.as_view()),
    path('', views.PostList.as_view(), name='getall'),
    path('search/', views.SearchPosts.as_view(), name='search'),
    path('my/', views.MyPostList.as_view(), name='getmy'),
    path('detail/<str:slug>/', views.PostDetail.as_view(), name='detail'),
    path('edit/<str:slug>/', views.PostAdminDetail.as_view(), name='edit'),
    path('create/', views.PostCreate.as_view(), name='create')
]

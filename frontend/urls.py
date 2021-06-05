from django.urls import path
from django.views.generic import TemplateView


urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('logout/', TemplateView.as_view(template_name='index.html')),
    path('register/', TemplateView.as_view(template_name='index.html')),
    path('my-posts/', TemplateView.as_view(template_name='index.html')),
    path('profile/', TemplateView.as_view(template_name='index.html')),
    path('create/', TemplateView.as_view(template_name='index.html')),
    path('edit/<str:slug>/', TemplateView.as_view(template_name='index.html')),
    path('post/<str:slug>/', TemplateView.as_view(template_name='index.html')),
    path('category/<str:slug>/', TemplateView.as_view(template_name='index.html')),
    path('search/', TemplateView.as_view(template_name='index.html')),
]

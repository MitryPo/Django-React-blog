from django.conf.urls import url
from django.urls import path
from .views import UserRegister, UserAccount


urlpatterns = [
    path('register/', UserRegister.as_view()),
    path('account/', UserAccount.as_view())
]

from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .models import Category 
from .serializers import CategorySerialzer
from rest_framework.permissions import AllowAny


class CategoryView(ListAPIView):
    permission_classes = [AllowAny,]
    queryset = Category.objects.all()
    serializer_class = CategorySerialzer
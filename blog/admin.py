from django.contrib import admin
from . import models


@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('image_tag','title', 'id', 'status', 'category', 'author')


@admin.register(models.Category)
class CategoryrAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')
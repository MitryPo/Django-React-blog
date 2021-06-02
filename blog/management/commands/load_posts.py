from time import sleep

from rest_framework import status
from users.models import User
from blog.models import Post, Category
from django.core.management.base import BaseCommand
from core.settings import FIXTURE_DIR, MEDIA_ROOT
import json, random, glob


class Command(BaseCommand):

    def handle(self, *args, **options):
        postsPath = FIXTURE_DIR+'/posts.json'
        imagePath = MEDIA_ROOT+'/posts/**.jpg'
        Post.objects.all().delete()
        with open(postsPath, 'r', encoding='utf-8') as f:
            tmpstr = f.read()
            data = json.loads(tmpstr)
        for i in range(8):
            for item in data:
                post = Post()
                post.author = User.objects.get(id=random.randint(1,2))
                post.category = Category.objects.get(id=random.randint(1,3))
                post.image = random.choice(glob.glob(imagePath))         
                post.status = random.choice(['draft', 'published'])
                post.title = item['title']
                post.content = item['content']
                post.excerpt = item['excerpt']            
                post.save()
                print(item)
        print('Posts have been loaded...')
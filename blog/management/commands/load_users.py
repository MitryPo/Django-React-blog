from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError
from users.models import User
from core.settings import FIXTURE_DIR
import json


class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading users...')
        path = FIXTURE_DIR+'/users.json'
        User.objects.all().delete()
        with open(path, 'r', encoding='utf-8') as f:
            tmpstr = f.read()
            data = json.loads(tmpstr)

        for item in data:
            user = User()
            user.email = item['email']
            user.user_name = item['user_name']
            user.set_password(item['password'])
            user.save()
            print(item)
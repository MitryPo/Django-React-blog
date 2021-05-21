from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError
from bazar.models import UserProfile
from core.settings import FIXTURE_DIR
import json


class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading users...')
        path = FIXTURE_DIR+'/users.json'
        UserProfile.objects.all().delete()
        with open(path, 'r', encoding='utf-8') as f:
            tmpstr = f.read()
            data = json.loads(tmpstr)

        for item in data:
            user = UserProfile()
            user.username = item['username']
            user.phone = item['phone']
            user.set_password(item['password'])
            user.balance = item['balance']
            user.save()
            print(item)
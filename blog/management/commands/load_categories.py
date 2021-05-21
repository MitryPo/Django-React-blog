from django.core.management.base import BaseCommand
from blog.models import Category
from core.settings import FIXTURE_DIR


class Command(BaseCommand):

    def handle(self, *args, **options):
        path = FIXTURE_DIR+'/categories.txt'
        Category.objects.all().delete()
        with open(path, 'r', encoding='utf-8') as f:
            for line in f:
                c = Category()
                c.name = (line).strip('\n')
                c.save()
        print('Categories have been loaded...')
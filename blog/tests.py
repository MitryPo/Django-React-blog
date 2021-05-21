from django import test
from django.test import TestCase
from django.contrib.auth.models import User
from blog.models import Post, Category


class Test_Create_Post(TestCase):

    @classmethod
    def setUpTestData(cls) -> None:
        test_category = Category.objects.create(name='catname')
        testuser1 = User.objects.create_user(username='testuser1',
                                             password='qwerty1234')
        test_post = Post.objects.create(category_id=1,
                                        title='Post Test Title',
                                        excerpt='Posts excerpt text',
                                        content='Post content',
                                        author_id=1, )

    def test_blog_content(self):
        post = Post.postobjects.get(id=1)
        cat = Category.objects.get(id=1)
        author = f'{post.author}'
        excerpt = f'{post.excerpt}'
        title = f'{post.title}'
        content = f'{post.content}'
        status = f'{post.status}'
        self.assertEqual(author, 'testuser1')
        self.assertEqual(title, 'Post Test Title')
        self.assertEqual(content, 'Post content')
        self.assertEqual(status, 'published')
        self.assertEqual(str(post), 'Post Test Title')
        self.assertEqual(str(cat), 'catname')

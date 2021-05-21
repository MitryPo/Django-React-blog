from os import stat
from django.http import response
from django.urls import reverse
from django.test import TestCase, client
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from blog.models import Post, Category
from django.contrib.auth.models import User



class PostTests(APITestCase):

    def test_view_posts(self):

        url = reverse('blog_api:get')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def create_post(self):

        self.test_category = Category.objects.create(name='catname')

        self.testuser1 = User.objects.create_user(
            username='test_user1', password='qwerty1234'
        )

        data = {"title": "new", "author": 1,
                "excerpt": "new", "content": "new"}
        url = reverse('blog_api:create')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_post_update(self):
        client = APIClient()

        self.test_category = Category.objects.create(name='django')
        self.testuser1 = User.objects.create_user(
            username='testuser1', password='qwerty1234')
        self.testuser2 = User.objects.create_user(
            username='testuser2', password='qwerty1234')
        test_post = Post.objects.create(
            category_id=1, 
            title='Post Title', 
            excerpt='Post Excerpt', 
            content='Post Content',
            author_id=1,
            status='published'
        )
        client.login(username=self.testuser1.username, password='qwerty1234')
        url = reverse(('blog_api:detailcrete'), kwargs={'pk':1})
        response = self.client.put(url, {
            "id":1,
            "title": "New",
            "author": 1,
            "exerpt": "New",
            "content": "New",
            "status": "published"
        }, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
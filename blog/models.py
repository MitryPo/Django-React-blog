from core.settings import MEDIA_ROOT
from django.db import models
from users.models import User
from django.urls import reverse
from django.utils import timezone
from django.utils.safestring import mark_safe
from .utils import generate_slug
from uuid import uuid4


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, blank=True, default=None, unique=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = generate_slug(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=None)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='posts', default=MEDIA_ROOT+'/posts/unnamed.png')
    excerpt = models.TextField(null=True)
    content = models.TextField()
    slug = models.SlugField(max_length=250, blank=True, unique=True)
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='blog_author')
    status = models.CharField(
        max_length=10, choices=options, default='draft')
    objects = models.Manager()
    postobjects = PostObjects()

    @property
    def image_tag(self):
        return mark_safe('<img width="60" src="%s" />' % self.image.url)

    def get_absolute_url(self):
        return reverse("post url", kwargs={"slug": self.slug})

    def save(self, *args, **kwargs):
        uid = uuid4()
        self.slug = generate_slug(self.title, uid.hex)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title

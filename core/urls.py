from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static



schema_view = get_schema_view(
   openapi.Info(
      title="Blog API",
      default_version='v1',
      description="BlogmeUp",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('', include('frontend.urls')),
   
    path('admin/', admin.site.urls),
    path('api/posts/', include('blog.urls')),
    path('api/user/', include('users.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),


    path('swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('doc', schema_view.with_ui('redoc', cache_timeout=0), name='schema-doc'),
]


urlpatterns += [
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
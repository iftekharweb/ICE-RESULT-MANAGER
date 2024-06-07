from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FormFillUpViewSet

router = DefaultRouter()
router.register(r'form-fill-ups', FormFillUpViewSet, basename='form-fill-up')

urlpatterns = [
    path('', include(router.urls)),
]

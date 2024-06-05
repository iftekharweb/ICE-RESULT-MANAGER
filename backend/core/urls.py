from django.urls import path, include
from .views import UserRegistrationView, UserLogInView, UserProfileView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLogInView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]
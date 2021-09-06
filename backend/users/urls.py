from django.urls import path
from .views import *


urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', registerUser, name='register'),

    path('profile/', getMyProfile, name="users-profile"),
    path('profile/update/', updateMyProfile, name="user-profile-update"),
    path('', getUsers, name="users"),

    path('<str:pk>/', getUserById, name='user'),

    path('update/<str:pk>/', updateMyProfile, name='user-update'),

    path('delete/<str:pk>/', deleteUserById, name='user-delete'),
]

from django.urls import path, include
from .views import Welcome, Login, Register, BatchDetails, Enroll
urlpatterns = [
    path('', Welcome.as_view()),
    path('login/', Login.as_view()),
    path('register/', Register.as_view()),
    path('batch/', BatchDetails.as_view()),
    path('enroll/', Enroll.as_view())
]
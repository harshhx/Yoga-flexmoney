from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=200, unique=True)
    mobile = models.CharField(max_length=150)
    email = models.EmailField(max_length=254)
    age = models.CharField(max_length=150)
    password = models.CharField(max_length=150)

    def __str__(self):  # __str__
        return (self.user.username)


class Batch(models.Model):
    name = models.CharField(max_length=150)
    timings = models.CharField(max_length=150)

    def __str__(self):  # __str__
        return f'{self.name} {self.timings}'


class BatchUser(models.Model):
    user = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    batch = models.ForeignKey('Batch', on_delete=models.CASCADE)
    started_on = models.DateField(auto_now_add=True)
    valid_till = models.DateField()
    active = models.BooleanField(default=True)



from django.contrib import admin
from .models import UserProfile, BatchUser, Batch
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(Batch)
admin.site.register(BatchUser)
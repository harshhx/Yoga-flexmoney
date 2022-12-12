# Generated by Django 4.1.4 on 2022-12-10 16:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Batch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('timings', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=200)),
                ('mobile', models.CharField(max_length=150)),
                ('email', models.EmailField(max_length=254)),
                ('age', models.CharField(max_length=150)),
                ('password', models.CharField(max_length=150)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BatchUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('started_on', models.DateField(auto_now=True)),
                ('valid_till', models.DateField()),
                ('active', models.BooleanField(default=True)),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='yoga.batch')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='yoga.userprofile')),
            ],
        ),
    ]
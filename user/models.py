from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    address = models.CharField(verbose_name='Адрес доставки', max_length=500)
    phone = models.CharField(verbose_name='Телефон', max_length=50)

    def __str__(self):
        return self.address

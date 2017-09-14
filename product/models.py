from django.db import models

class Product(models.Model):
    name = models.CharField(verbose_name='Название продукта', max_length=50)
    price = models.PositiveSmallIntegerField(verbose_name='Цена')
    photo = models.CharField(verbose_name='Фото', max_length=500)

    def __str__(self):
        return self.name
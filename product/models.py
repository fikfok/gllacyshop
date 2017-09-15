from django.db import models

class Category(models.Model):
    name = models.CharField(verbose_name='Категория', max_length=50)
    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(verbose_name='Название продукта', max_length=50)
    price = models.PositiveSmallIntegerField(verbose_name='Цена')
    photo = models.ImageField(upload_to='products')
    category_id = models.ForeignKey(Category, verbose_name='Категория')
    is_hit = models.BooleanField(verbose_name='Хит', default=False)
    is_new = models.BooleanField(verbose_name='Новика', default=True)

    def __str__(self):
        return self.name
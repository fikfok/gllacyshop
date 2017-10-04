from django.db import models
from product.models import Product
from django.contrib.auth.models import User
from user.models import Profile

class OrderStatus(models.Model):
    name = models.CharField(max_length=50, verbose_name='Статус заказа')
    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(User, verbose_name='Пользователь')
    order_date = models.DateTimeField(auto_now=True, verbose_name='Дата и время заказа')
    profile = models.ForeignKey(Profile, verbose_name='Профайл пользователя')
    comment = models.CharField(max_length=500, verbose_name='Комментарий к заказу')
    status = models.ForeignKey(OrderStatus, verbose_name='Статус заказа')
    status_change_date = models.DateTimeField(auto_now=True, verbose_name='Дата и время изменения статуса')

    def __str__(self):
        return 'Order #{0}'.format(self.pk)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order', verbose_name='Заказ')
    product = models.ForeignKey(Product, verbose_name='Товар')
    count = models.DecimalField(max_digits=6, decimal_places=1, verbose_name='Количество')
    price = models.DecimalField(max_digits=6, decimal_places=1, verbose_name='Цена за единицу')


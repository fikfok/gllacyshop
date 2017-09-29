# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-09-27 13:12
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
        ('product', '0003_auto_20170919_1037'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_date', models.DateTimeField(auto_now=True, verbose_name='Дата и время заказа')),
                ('comment', models.CharField(max_length=500, verbose_name='Комментарий к заказу')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.Profile', verbose_name='Профайл пользователя')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.PositiveSmallIntegerField(verbose_name='Количество')),
                ('price', models.DecimalField(decimal_places=1, max_digits=6, verbose_name='Цена за единицу')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.Order', verbose_name='Заказ')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.Product', verbose_name='Товар')),
            ],
        ),
    ]
# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-10-04 13:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_auto_20171004_1250'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status_change_date',
            field=models.DateTimeField(auto_now=True, verbose_name='Дата и время изменения статуса'),
        ),
    ]

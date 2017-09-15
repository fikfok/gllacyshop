from django.core.management.base import BaseCommand
from product.models import Product, Category


class Command(BaseCommand):
    help = 'Fill DB new data'

    def handle(self, *args, **options):
        p = Product.objects.all()
        p.delete()

        c = Category.objects.all()
        c.delete()

        categories = [
            {'name': 'Сливочное'},
            {'name': 'Щербет'},
            {'name': 'Фруктовый лёд'},
            {'name': 'Мелорин'}
        ]
        for item in categories:
            item = Category(**item)
            item.save()

        products = [
            {'name': 'Сливочное с апельсиновым джемом и цитрусовой стружкой', 'price': 310, 'photo': 'products/item_1.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
            {'name': 'Сливочно-кофейное с кусочками шоколада', 'price': 380, 'photo': 'products/item_2.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
            {'name': 'Сливочно-клубничное с присыпкой из белого шоколада', 'price': 355, 'photo': 'products/item_3.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
            {'name': 'Сливочное крем-брюле с карамельной подливкой', 'price': 415, 'photo': 'products/item_4.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
            {'name': 'Сливочное с брусничным джемом', 'price': 325, 'photo': 'products/item_5.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
            {'name': 'Сливочно-черничное с цельными ягодами черники', 'price': 410, 'photo': 'products/item_6.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
            {'name': 'Сливочно-лимонное с карамельной присыпкой', 'price': 375, 'photo': 'products/item_7.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
            {'name': 'Сливочное с шоколадной стружкой', 'price': 320, 'photo': 'products/item_8.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
            {'name': 'Сливочно ванильное с кусочками шоколада', 'price': 440, 'photo': 'products/item_9.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
            {'name': 'Сливочное с ментоловым сиропом', 'price': 435, 'photo': 'products/item_10.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
            {'name': 'Сливочное с кусочками черного шоколада', 'price': 355, 'photo': 'products/item_11.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
            {'name': 'Сливочное с мятным сиропом', 'price': 420, 'photo': 'products/item_12.jpg', 'category_id': Category.objects.get(name='Сливочное'), 'is_hit': 0, 'is_new': 1},
        ]
        for item in products:
            item = Product(**item)
            item.save()

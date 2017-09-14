from django.core.management.base import BaseCommand
from product.models import Product


class Command(BaseCommand):
    help = 'Fill DB new data'

    def handle(self, *args, **options):
        products = [
            {'name': 'Сливочное с апельсиновым джемом и цитрусовой стружкой', 'price': 310, 'photo': 'img/item_1.jpg'},
            {'name': 'Сливочно-кофейное с кусочками шоколада', 'price': 380, 'photo': 'img/item_2.jpg'},
            {'name': 'Сливочно-клубничное с присыпкой из белого шоколада', 'price': 355, 'photo': 'img/item_3.jpg'},
            {'name': 'Сливочное крем-брюле с карамельной подливкой', 'price': 415, 'photo': 'img/item_4.jpg'},
            {'name': 'Сливочное с брусничным джемом', 'price': 325, 'photo': 'img/item_5.jpg'},
            {'name': 'Сливочно-черничное с цельными ягодами черники', 'price': 410, 'photo': 'img/item_6.jpg'},
            {'name': 'Сливочно-лимонное с карамельной присыпкой', 'price': 375, 'photo': 'img/item_7.jpg'},
            {'name': 'Сливочное с шоколадной стружкой', 'price': 320, 'photo': 'img/item_8.jpg'},
            {'name': 'Сливочно ванильное с кусочками шоколада', 'price': 440, 'photo': 'img/item_9.jpg'},
            {'name': 'Сливочное с ментоловым сиропом', 'price': 435, 'photo': 'img/item_10.jpg'},
            {'name': 'Сливочное с кусочками черного шоколада', 'price': 355, 'photo': 'img/item_11.jpg'},
            {'name': 'Сливочное с мятным сиропом', 'price': 420, 'photo': 'img/item_12.jpg'},
        ]
        for item in products:
            item = Product(**item)
            item.save()

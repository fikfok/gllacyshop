from product.models import Category
from django.forms.models import model_to_dict

def category_list(request):
    categories = list(Category.objects.values('name', 'id'))
    categories.insert(0, {'name': 'Новинки', 'id': '-1'})
    return {'category_list': categories}

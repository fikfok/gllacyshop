from product.models import Category

def add_categories(request):
    categories = Category.objects.values()
    return {'categories': categories}
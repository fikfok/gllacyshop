from django.shortcuts import render
from django.views.generic.list import ListView
from .models import Product

# def products(request):
#     return render(request, 'products.html', {'current_page': 'products'})

class ProductsListView(ListView):
    model = Product
    template_name = 'products.html'
    # paginate_by = 10
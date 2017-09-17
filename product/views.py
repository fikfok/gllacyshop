from django.shortcuts import render
from django.views.generic.list import ListView
from .models import Product
from django.conf import settings
from gllacyshop.settings import MEDIA_ROOT, MEDIA_URL

# def products(request):
#     return render(request, 'products.html', {'current_page': 'products'})

class ProductsListView(ListView):
    model = Product
    template_name = 'products.html'
    # paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['media_url'] = MEDIA_URL
        return context
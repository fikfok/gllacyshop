from django.views.generic.list import ListView
from django.shortcuts import render
from product.models import Product
from gllacyshop.settings import MEDIA_URL

class Home(ListView):
    model = Product
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['media_url'] = MEDIA_URL
        context['current_page'] = 'home'
        return context

    def get_queryset(self):
        queryset = Product.objects.filter(is_hit=True)
        return queryset
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Product
from gllacyshop.settings import MEDIA_URL
from django.contrib.auth.decorators import user_passes_test
from django.utils.decorators import method_decorator
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import redirect
from .forms import ProductEditForm
from django.shortcuts import render
from django.http import Http404

class ProductsListView(ListView):
    model = Product
    template_name = 'products.html'
    paginate_by = 3

    def get_context_data(self, **kwargs):
        context = super(ProductsListView, self).get_context_data(**kwargs)
        context['media_url'] = MEDIA_URL
        return context

    @method_decorator(user_passes_test(lambda u: u.is_superuser, login_url='/'))
    def dispatch(self, *args, **kwargs):
        prod_list = Product.objects.all()
        paginator = Paginator(prod_list, self.paginate_by)

        page = self.request.GET.get('page', 1)
        try:
            object_list = paginator.page(page)
        except PageNotAnInteger:
            self.kwargs['page'] = 1
            """Почему от сюда видно имя url'а?"""
            return redirect('products')
        except EmptyPage:
            self.kwargs['page'] = 1
            """Почему от сюда видно имя url'а?"""
            return redirect('products')
        return super(ListView, self).dispatch(*args, **kwargs)


class ProductsUpdateView(UpdateView):
    model = Product
    form_class = ProductEditForm
    template_name = 'products_update.html'
    # fields = ('__all__')
    success_url = '/admin/products/'

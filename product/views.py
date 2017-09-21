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
ITEMS_IN_PAGES = 3


def get_page_num(pk):
    current_prod_rank = Product.objects.filter(pk__lte=int(pk)).count()
    return current_prod_rank // ITEMS_IN_PAGES + int(bool(((current_prod_rank / ITEMS_IN_PAGES) % 1)))

class ProductsListView(ListView):
    model = Product
    template_name = 'products.html'
    paginate_by = ITEMS_IN_PAGES

    def get_context_data(self, **kwargs):
        context = super(ProductsListView, self).get_context_data(**kwargs)
        context['media_url'] = MEDIA_URL
        context['current_site'] = 'products_list'
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
    success_url = '/admin/products/'

    def get_context_data(self, **kwargs):
        context = super(ProductsUpdateView, self).get_context_data(**kwargs)
        context['page_number'] = get_page_num(self.kwargs['pk'])
        context['current_prod_name'] = Product.objects.get(pk = int(self.kwargs['pk'])).name
        context['current_site'] = 'products_update'
        return context

    def get_success_url(self):
        return self.success_url + '?page=' + str(get_page_num(self.kwargs['pk']))

    @method_decorator(user_passes_test(lambda u: u.is_superuser, login_url='/'))
    def dispatch(self, request, *args, **kwargs):
        return super(UpdateView, self).dispatch(request, *args, **kwargs)

class ProductsCreateView(CreateView):
    model = Product
    form_class = ProductEditForm
    template_name = 'products_create.html'
    success_url = '/admin/products/'

    def get_context_data(self, **kwargs):
        context = super(ProductsCreateView, self).get_context_data(**kwargs)
        context['current_site'] = 'products_create'
        return context

    def get_success_url(self):
        return self.success_url + '?page=' + str(get_page_num(Product.objects.last().pk))

    @method_decorator(user_passes_test(lambda u: u.is_superuser, login_url='/'))
    def dispatch(self, request, *args, **kwargs):
        return super(CreateView, self).dispatch(request, *args, **kwargs)


class ProductsDeleteView(DeleteView):
    model = Product
    success_url = '/admin/products/'

    @method_decorator(user_passes_test(lambda u: u.is_superuser, login_url='/'))
    def dispatch(self, request, *args, **kwargs):
        return super(DeleteView, self).dispatch(request, *args, **kwargs)


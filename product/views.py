from django.shortcuts import render
from django.views.generic.list import ListView
from .models import Product
from gllacyshop.settings import MEDIA_URL
from django.contrib.auth.decorators import user_passes_test
from django.utils.decorators import method_decorator
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import Http404

class ProductsListView(ListView):
    model = Product
    template_name = 'products.html'
    paginate_by = 3

    def get_context_data(self, **kwargs):
        prod_list = Product.objects.all()
        paginator = Paginator(prod_list, self.paginate_by)

        page = self.request.GET.get('page')
        try:
            object_list = paginator.page(page)
        except PageNotAnInteger:
            self.kwargs['page'] = 1
            object_list = paginator.page(1)
        except EmptyPage:
            self.kwargs['page'] = 1
            object_list = paginator.page(1)

        # try:
        #     context = super(ProductsListView, self).get_context_data(**kwargs)
        # except Http404:
        #     self.kwargs['page'] = 1
        #     self.kwargs['media_url'] = MEDIA_URL
        #     return super(ProductsListView, self).get_context_data(**kwargs)

        context = super(ProductsListView, self).get_context_data(**kwargs)
        context['media_url'] = MEDIA_URL
        context['object_list'] = object_list
        return context

    @method_decorator(user_passes_test(lambda u: u.is_superuser, login_url='/'))
    def dispatch(self, *args, **kwargs):

        print(self.request.GET.get('page'))

        return super(ListView, self).dispatch(*args, **kwargs)

    # def get(self, *args, **kwargs):
    #     if kwargs['username'] != request.user.username:
    #         return redirect('index')
    #     return super(PhotoListView, self).get(*args, **kwargs)
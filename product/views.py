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

    # def get(self, *args, **kwargs):
    #     request = self.request
    #     print(request.GET.get('page'))
    #     try:
    #         return super(ProductsListView, self).get(*args, **kwargs)
    #     except Http404:
    #         print('rrrrrrrrrrrrrrrrrrrrrrr')
    #         # if request.GET.get('page', 1) == 1:
    #         #     raise

        # return redirect('%s?%s' % (request.path, page1.urlencode()))

    def get_context_data(self, **kwargs):
        context = super(ProductsListView, self).get_context_data(**kwargs)
        prod_list = Product.objects.all()
        paginator = Paginator(prod_list, self.paginate_by)

        page = self.request.GET.get('page')
        print(self.request.GET.get('page'))

        try:
            prod_page = paginator.page(page)
        except PageNotAnInteger:
            print('NOT INT!!!!!!')
            # prod_page = paginator.page(1)
        except EmptyPage:
            print('EMPTY!!!!!!')
            # prod_page = paginator.page(paginator.num_pages)

        # prod_page = paginator.page(1)
        context['media_url'] = MEDIA_URL
        context['object_list'] = paginator.page(1)
        return context

    @method_decorator(user_passes_test(lambda u: u.is_superuser, login_url='/'))
    def dispatch(self, *args, **kwargs):
        return super(ListView, self).dispatch(*args, **kwargs)
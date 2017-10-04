from django.views.generic.list import ListView
from django.views.generic import TemplateView
from django.http import JsonResponse
from product.models import Product
from gllacyshop.settings import MEDIA_URL
from user.forms import UserRegistrationForm, UserProfileForm
from user.models import Profile
from home.models import Order, OrderItem, OrderStatus
import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.contrib.auth.decorators import user_passes_test
from django.utils.decorators import method_decorator
from django.shortcuts import redirect
from django.contrib.auth.models import User

ITEMS_IN_PAGES = 5

class Home(ListView):
    model = Product
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['media_url'] = MEDIA_URL
        context['current_site'] = 'home'
        context['registration_form'] = UserRegistrationForm()
        return context

    def get_queryset(self):
        queryset = Product.objects.filter(is_hit=True)[:4]
        return queryset

class CompleteOrder(TemplateView):
    template_name = 'confirm_order.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['media_url'] = MEDIA_URL
        context['current_site'] = 'confirm_order'
        context['registration_form'] = UserRegistrationForm()
        context['profile_form'] = UserProfileForm()
        return context

    def post(self, request, *args, **kwargs):
        prf_count = Profile.objects.filter(user_id=request.user.id).count()
        if prf_count > 0:
            order_list = json.loads(request.POST['data'])
            ids = [item['key'] for item in order_list]
            if Product.objects.filter(id__in=ids).count() == len(ids):
                new_order = Order(profile_id=Profile.objects.values('pk').get(user_id=request.user.id)['pk'],
                                  user_id=request.user.id,
                                  status_id=OrderStatus.objects.values('pk').get(name='Новый')['pk'])
                new_order.save()
                for item in order_list:
                    new_item = OrderItem(order_id=new_order.id,
                                         product_id=item['key'],
                                         count=item['value']['count'],
                                         price=Product.objects.values('price').get(pk=item['key'])['price'])
                    new_item.save()
                return JsonResponse({'status': 'OK'})
            return JsonResponse({'status': 'WRONG_ORDER'})
        else:
            return JsonResponse({'status': 'NO_ADDRESS'})


class SaveProfile(TemplateView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['media_url'] = MEDIA_URL
        context['current_site'] = 'profile'
        return context

    def post(self, request, *args, **kwargs):
        data = json.loads(request.POST['data'])
        if request.user.id and data['address'] and data['phone']:
            new_profile = Profile(user_id=request.user.id, address=data['address'], phone=data['phone'])
            new_profile.save()
            return JsonResponse({'status': 'OK'})
        else:
            return JsonResponse({'status': 'ERROR'})


class OrdersListView(ListView):
    model = Order
    template_name = 'orders_list.html'
    paginate_by = ITEMS_IN_PAGES

    def get_context_data(self, **kwargs):
        context = super(OrdersListView, self).get_context_data(**kwargs)
        context['media_url'] = MEDIA_URL
        context['current_site'] = 'orders_list'
        return context

    def get_queryset(self):
        if User.objects.values('is_staff').get(pk=self.request.user.id)['is_staff']:
            order_list = Order.objects.all().order_by('pk')
        else:
            order_list = Order.objects.filter(user_id=self.request.user.id).order_by('pk')
        return order_list



    @method_decorator(user_passes_test(lambda u: u.is_authenticated, login_url='/'))
    def dispatch(self, *args, **kwargs):
        if User.objects.values('is_staff').get(pk=self.request.user.id)['is_staff']:
            order_list = Order.objects.all().order_by('pk')
        else:
            order_list = Order.objects.filter(user_id=self.request.user.id).order_by('pk')

        paginator = Paginator(order_list, self.paginate_by)

        page = self.request.GET.get('page', 1)
        try:
            object_list = paginator.page(page)
        except PageNotAnInteger:
            self.kwargs['page'] = 1
            return redirect('orders')
        except EmptyPage:
            self.kwargs['page'] = 1
            return redirect('orders')
        return super(ListView, self).dispatch(*args, **kwargs)

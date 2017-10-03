from django.views.generic.list import ListView
from django.views.generic import TemplateView
from django.shortcuts import render_to_response
from django.http import JsonResponse
from product.models import Product
from gllacyshop.settings import MEDIA_URL
from user.forms import UserRegistrationForm, UserProfileForm
from user.models import Profile

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
        if prf_count:
            return JsonResponse({'status': 'OK'})
        else:
            return JsonResponse({'status': 'NO_ADDRESS'})
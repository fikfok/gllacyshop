from django.views.generic.list import ListView
from django.contrib.auth.models import User
from django.contrib.auth.decorators import user_passes_test
from django.utils.decorators import method_decorator
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import redirect
# from .models import UserShippingAddress
from django.db.models import Prefetch
ITEMS_IN_PAGES = 3

def get_page_num(pk):
    current_prod_rank = User.objects.filter(pk__lte=int(pk)).count()
    return current_prod_rank // ITEMS_IN_PAGES + int(bool(((current_prod_rank / ITEMS_IN_PAGES) % 1)))

class UsersListView(ListView):
    model = User
    template_name = 'users.html'
    paginate_by = ITEMS_IN_PAGES

    def get_context_data(self, **kwargs):
        context = super(ListView, self).get_context_data(**kwargs)
        context['current_site'] = 'users_list'
        context['first_name'] = self.request.GET.get('first-name', '')
        context['last_name'] = self.request.GET.get('last-name', '')
        context['login'] = self.request.GET.get('login', '')
        context['email'] = self.request.GET.get('email', '')
        context['address'] = self.request.GET.get('address', '')
        return context

    def get_queryset(self):
        qs = User.objects.filter(
            first_name__contains=self.request.GET.get('first-name', ''),
            last_name__contains=self.request.GET.get('last-name', ''),
            username__contains=self.request.GET.get('login', ''),
            email__contains=self.request.GET.get('email', ''))
        if self.request.GET.get('address'):
            qs = qs.filter(address__address__contains=self.request.GET.get('address'))
        return qs




    @method_decorator(user_passes_test(lambda u: u.is_superuser, login_url='/'))
    def dispatch(self, *args, **kwargs):
        usr_list = User.objects.all()
        paginator = Paginator(usr_list, self.paginate_by)

        page = self.request.GET.get('page', 1)
        try:
            object_list = paginator.page(page)
        except PageNotAnInteger:
            self.kwargs['page'] = 1
            return redirect('users')
        except EmptyPage:
            self.kwargs['page'] = 1
            return redirect('users')
        return super(ListView, self).dispatch(*args, **kwargs)

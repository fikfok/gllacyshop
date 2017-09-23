from django.views.generic.list import ListView
from django.contrib.auth.models import User
from django.contrib.auth.decorators import user_passes_test
from django.utils.decorators import method_decorator
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import redirect, get_object_or_404
from .forms import UserRegistrationForm
from django.http import Http404, JsonResponse
from django.template import loader
from django.template.context_processors import csrf

ITEMS_IN_PAGES = 5

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

def create_user(request):
    if request.is_ajax() and request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            user_form.save()
            data = {'status': 'ok'}
        else:
            context = {'registration_form': user_form}
            context.update(csrf(request))
            html = loader.render_to_string('inc_create_user.html', context)
            data = {'status': 'errors', 'html': html}
        return JsonResponse(data)


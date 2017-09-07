from django.shortcuts import render, HttpResponseRedirect
from django.contrib import auth
from django.http import Http404

def home(request):
    return render(request, 'home.html')

def login(request):
    if request.method == 'POST':
        username = request.POST.get('login')
        password = request.POST.get('password')
        print(username, password)
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return HttpResponseRedirect("/")
        else:
            return render(request, 'home.html', {'username': username, 'authorizeError': True})
    raise Http404

def logout(request):
    print('logout')
    auth.logout(request)
    return HttpResponseRedirect("/")
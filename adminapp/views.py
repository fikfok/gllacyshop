from django.shortcuts import render, HttpResponseRedirect
from django.contrib import auth
from django.http import Http404, JsonResponse
from django.template import loader

def login(request):
    if request.is_ajax() and request.method == 'POST':
        username = request.POST.get('login')
        password = request.POST.get('password')
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            auth.login(request, user)
            userPanel = loader.render_to_string('inc_user_auth_panel.html', request=request)
            authPanel = loader.render_to_string('inc_authrorize.html', request=request)
            data = {'authorizeStatus': 'ok', 'userPanel': userPanel, 'authPanel': authPanel}
        else:

            data = {'authorizeStatus': 'error'}
    return JsonResponse(data)

def logout(request):
    auth.logout(request)
    authPanel = loader.render_to_string('inc_authrorize.html', request=request)
    data = {'authorizeStatus': 'ok', 'userPanel': '', 'authPanel': authPanel}
    #
    return JsonResponse(data)

def admin_users(request):
    data = {}
    return JsonResponse(data)
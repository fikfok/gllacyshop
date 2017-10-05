"""gllacyshop URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
import home.views as hm
import adminapp.views as adm
import product.views as pr
import user.views as usr

urlpatterns = [
    url(r'^admin/', admin.site.urls),
]

urlpatterns += [
    url(r'^$', hm.Home.as_view(), name='home'),
    url(r'^admin/products/$', pr.ProductsListView.as_view(), name="products"),
    url(r'^admin/products/update/(?P<pk>\d+)/$', pr.ProductsUpdateView.as_view(), name='products_update'),
    url(r'^admin/products/create/$', pr.ProductsCreateView.as_view(), name="products_create"),
    url(r'^admin/products/delete/(?P<pk>\d+)/$', pr.ProductsDeleteView.as_view(), name="products_delete"),
    url(r'^admin/users/$', usr.UsersListView.as_view(), name="users"),
    url(r'^user/login/$', adm.login, name='login'),
    url(r'^user/logout/$', adm.logout, name='logout'),
    url(r'^create/user/$', usr.create_user, name='create_user'),
    url(r'^order/$', hm.CompleteOrder.as_view(), name='complete_order'),
    url(r'^profile/$', hm.SaveProfile.as_view(), name='profile'),
    url(r'^orders/$', hm.OrdersListView.as_view(), name='orders'),
    url(r'^ordercomment/$', hm.order_comment, name='order_comment'),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
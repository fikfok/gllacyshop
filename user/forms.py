from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile

class UserRegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2', 'first_name', 'last_name')
        labels = {
            'username': 'Логин',
            'password1': 'Пароль',
            'password2': 'Подтверждение пароля',
            'email': 'E-mail',
            'first_name': 'Имя',
            'last_name': 'Фамилия'
        }
        # При таком способе присвоения класса полям с паролями почему-то класс не присваивается
        # Пришлось в шаблоне с помощью кастомного тега-фильтра добавлять класс
        # widgets = {'username': forms.TextInput(attrs={'class': 'txt-box ttt'}),
        #            'password1': forms.PasswordInput(attrs={'style': 'border-color: red;'}),
        #            'password2': forms.PasswordInput(attrs={'class': 'txt-box'}),
        #            'email': forms.TextInput(attrs={'class': 'txt-box'}),
        #            'first_name': forms.TextInput(attrs={'class': 'txt-box'}),
        #            'last_name': forms.TextInput(attrs={'class': 'txt-box'}),
        #            }

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['address', 'phone']
        labels = {'address': 'Адрес доставки',
                  'phone': 'Телефон'
                  }
        widgets = {'address': forms.Textarea(attrs={'class': 'create-profile-address'}),
                   'phone': forms.TextInput(attrs={'class': 'txt-box'}),
                   }

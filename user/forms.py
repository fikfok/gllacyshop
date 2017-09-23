from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


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
        # def clean(self):
        #     cleaned_data = super(UserRegistrationForm, self).clean()
        #     password1 = cleaned_data.get('password1')
        #     password2 = cleaned_data.get('password2')
        #
        #     if password1 != password2:
        #         # self.add_error('password2', 'Пароли не совпадают')
        #         raise forms.ValidationError("Пароли не совпадают")

        # При таком способе присвоения класса полям с паролями почему-то класс не присваивается
        # Пришлось в шаблоне с помощью кастомного тега-фильтра добавлять класс
        # widgets = {'username': forms.TextInput(attrs={'class': 'txt-box ttt'}),
        #            'password1': forms.PasswordInput(attrs={'style': 'border-color: red;'}),
        #            'password2': forms.PasswordInput(attrs={'class': 'txt-box'}),
        #            'email': forms.TextInput(attrs={'class': 'txt-box'}),
        #            'first_name': forms.TextInput(attrs={'class': 'txt-box'}),
        #            'last_name': forms.TextInput(attrs={'class': 'txt-box'}),
        #            }



# class UserChangeForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = ['username', 'email', 'first_name', 'last_name']
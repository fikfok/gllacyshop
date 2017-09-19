from django import forms
from .models import Product


class ImageThumbnailFileInput(forms.ClearableFileInput):
    template_name = 'photo_thumbnail.html'


class ProductEditForm(forms.ModelForm):

    """
    Форма для обновления данных пользователей. Нужна только для того, чтобы не
    видеть постоянных ошибок "Не заполнено поле password" при обновлении данных
    пользователя.
    """

    class Meta:
        model = Product
        fields = ['name', 'price', 'is_hit', 'is_new', 'category_id', 'photo']
        labels = {'name': 'Название мороженного', 'price': 'Цена', 'is_hit': 'Хит', 'is_new': 'Новый', 'category_id': 'Категория', 'photo': 'Фото'}
        widgets = {'name': forms.Textarea(attrs={'class': 'txt-box fixed-trextarea'}),
                   'price': forms.NumberInput(attrs={'class': 'txt-box', 'style': 'width: 20%;'}),
                   'is_hit': forms.CheckboxInput(attrs={'class': 'chck-fillers'}),
                   'is_new': forms.CheckboxInput(attrs={'class': 'chck-fillers'}),
                   'category_id': forms.Select(attrs={'class': 'dropdown-list--contrast txt-box'}),
                   'photo': forms.ClearableFileInput,}

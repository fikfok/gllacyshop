from django import forms
from .models import Order

class OrderCommentForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['comment']
        labels = {'comment': 'Комментарий к заказу'}
        widgets = {'comment': forms.Textarea(attrs={'class': 'create-profile-address'}),}

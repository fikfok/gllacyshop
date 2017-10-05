from django import template
import re

register = template.Library()

def my_range(number):
    return list(range(1, number + 1))

def tag_name(obj):
    print(obj.__class__.__name__)
    return obj.__class__.__name__

def find_href_src(obj):
    res = re.findall(r'<a href="(.+)">', str(obj))
    return res[0] if res else ''

def addcss(value, arg):
    css_classes = value.field.widget.attrs.get('class')
    if css_classes is None:
        return value.as_widget(attrs={'class': arg})
    else:
        css_classes = value.field.widget.attrs.get('class', None).split(' ')
        if arg not in css_classes:
            css_classes = '%s %s' % (css_classes, arg)
        return value.as_widget(attrs={'class': css_classes})

def total_sum(prod_list, prop_name):
   return sum(getattr(item, prop_name) for item in prod_list)

register.filter('my_range', my_range)
register.filter('tag_name', tag_name)
register.filter('find_href_src', find_href_src)
register.filter('addcss', addcss)
register.filter('total_sum', total_sum)


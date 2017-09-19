from django import template
import re

register = template.Library()

def my_range(number):
    return list(range(1, number + 1))

def tag_name(obj):
    return obj.__class__.__name__

def find_href_src(obj):
    # print(str(obj))
    print(re.search('<a href="(.+)">', str(obj)))

register.filter('my_range', my_range)
register.filter('tag_name', tag_name)
register.filter('find_href_src', find_href_src)



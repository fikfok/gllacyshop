from django import template
register = template.Library()

def my_range(number):
    return list(range(1, number + 1))

register.filter('my_range', my_range)

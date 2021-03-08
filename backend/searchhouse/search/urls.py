from django.urls import re_path, path

from . import views

urlpatterns = [
    re_path(r'^locations/$', views.location_list),
    re_path(r'^locations/(?P<pk>[0-9]+)$', views.location_detail), 
]



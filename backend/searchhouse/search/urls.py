from django.urls import re_path, path
from django.conf.urls import url

from . import views

urlpatterns = [
   path('locations', views.location_list),
   path('locations/<int:pk>', views.location_detail),
   path('locations/seller/', views.SellerListView.as_view()),
    
]



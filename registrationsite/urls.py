from django.conf.urls import patterns, include, url
from registration import views
from rest_framework import viewsets, routers
from django.contrib import admin
from django.contrib.auth.models import User, Group

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^users/', views.UserListView.as_view()),
    url(r'^user/(?P<pk>[0-9]+)/$', views.UserDetailView.as_view()),
     
     # API authentication 
     #url(r'^oauth2/', include('provider.oauth2.urls', namespace='oauth2')), 
     url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)

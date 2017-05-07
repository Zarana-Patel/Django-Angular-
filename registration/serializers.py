from rest_framework import serializers
from django.contrib.auth.models import User
from datetime import datetime


		
class UserSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = User 
		fields = ('id', 'first_name','last_name','email','username')
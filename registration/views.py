
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import Http404

# REST Framework
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
#from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from registration.serializers import UserSerializer


class UserListView(APIView):
    #permission_classes = (IsAuthenticated,)

    def get(self, request):
        """ Get all Users """
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
    	serializer = UserSerializer(data=request.DATA)
        if serializer.is_valid():
        	serializer.save()
        	return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
        	user = self.get_object(pk)
        	user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserDetailView(APIView):
    """
    Retrieve, update or delete a user instance.
    """
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
    	user = self.get_object(pk)
        user = UserSerializer(user)
        return Response(user.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



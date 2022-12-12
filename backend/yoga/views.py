import datetime

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserProfile, BatchUser, Batch


class Welcome(APIView):
    @staticmethod
    def get(request):
        return Response({'message': 'I am Alive'}, status.HTTP_200_OK)


class Login(APIView):

    @staticmethod
    def getBatchDetails(user):
        active_batches = BatchUser.objects.filter(user=user, active=True)
        for i in active_batches:
            if datetime.date.today() > i.valid_till:
                i.active = False
                i.save()
        active_batches = BatchUser.objects.filter(user=user, active=True)
        if not active_batches:
            return False, {}
        else:
            batch = active_batches[0]
            cur_details = {
                'name': batch.batch.name,
                'timings': batch.batch.timings,
                'started_on': batch.started_on,
                'days_remaining': (batch.valid_till - datetime.date.today()).days
            }
            return True, cur_details

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = UserProfile.objects.filter(username=email)
        if not user or len(user) > 1:
            msg = {'message': 'No user exists'}
            data = {'success': False, 'message': msg}
            return Response(data, status.HTTP_200_OK)
        else:
            user = user[0]
            if user.password != password:
                msg = {'message': 'Incorrect Password'}
                data = {'success': False, 'message': msg}
                return Response(data, status.HTTP_200_OK)
            else:
                present, batch_details = self.getBatchDetails(user)
                data = {
                    'user_id': user.id,
                    'first_name': user.user.first_name,
                    'last_name': user.user.last_name,
                    'age': user.age,
                    'session_active': present,
                    'batch_details': batch_details
                }
                data = {'success': True, 'message': 'Login Successful', 'data': data, }
                return Response(data, status.HTTP_200_OK)


class Register(APIView):
    @staticmethod
    def post(request):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        mobile = request.data.get('mobile')
        email = request.data.get('email')
        password = request.data.get('password')
        age = request.data.get('age')

        user = UserProfile.objects.filter(username=email)
        if user:
            msg = {'message': 'User already exists'}
            data = {'success': False, 'message': msg}
            return Response(data, status.HTTP_200_OK)

        try:
            new_user = User(first_name=first_name, username=email)
            if last_name:
                new_user.last_name = last_name
            new_user.set_password(password)
            new_user.save()
            new_user_profile = UserProfile(user=new_user, mobile=mobile, email=email, age=age, username=email,
                                           password=password)
            new_user_profile.save()
            msg = {'message': 'User created Successfully'}
            data = {
                'user_id': new_user_profile.id,
                'first_name': new_user_profile.user.first_name,
                'last_name': new_user_profile.user.last_name,
                'age': new_user_profile.age,
                'session_active': False,
                'batch_details': {}
            }
            data = {'success': True, 'message': msg, 'data': data}
            return Response(data, status.HTTP_200_OK)

        except Exception as e:
            msg = {'message': 'oops! Some Error Occurred on our side'}
            data = {'success': False, 'message': msg, 'data': {}}
            return Response(data, status.HTTP_200_OK)


class BatchDetails(APIView):
    @staticmethod
    def get(request):
        data = []
        all_batches = Batch.objects.all()
        for i in all_batches:
            cur = {
                'id': i.id,
                'name': i.name,
                'timings': i.timings
            }
            data.append(cur)
        final = {
            'success': True,
            'message': '',
            'data': data
        }
        return Response(final, status.HTTP_200_OK)


class Enroll(APIView):

    @staticmethod
    def last_day_of_month(any_day):
        next_month = any_day.replace(day=28) + datetime.timedelta(days=4)
        return next_month - datetime.timedelta(days=next_month.day)

    @staticmethod
    def getBatchDetails(user):
        active_batches = BatchUser.objects.filter(user=user, active=True)
        for i in active_batches:
            if datetime.date.today() > i.valid_till:
                i.active = False
                i.save()
        active_batches = BatchUser.objects.filter(user=user, active=True)
        if not active_batches:
            return False, {}
        else:
            batch = active_batches[0]
            cur_details = {
                'name': batch.batch.name,
                'timings': batch.batch.timings,
                'started_on': batch.started_on,
                'days_remaining': (batch.valid_till - datetime.date.today()).days
            }
            return True, cur_details

    def post(self, request):
        user_id = request.data.get('user_id')
        batch_id = request.data.get('batch_id')
        user = UserProfile.objects.filter(id=int(user_id))[0]
        cur_batches = BatchUser.objects.filter(user=user, active=True)
        if cur_batches:
            return Response({
                'success': False,
                'message': 'Your batch already exists',
                'data': {}
            }, status.HTTP_200_OK)

        if 18>int(user.age) or 65<int(user.age):
            res = {
                'success': False,
                'message': 'Sorry! Only people between age 18 to 65 can enroll',
                'data': {}
            }
            return Response(res, status.HTTP_200_OK)

        selected_batch = Batch.objects.get(id=int(batch_id))
        new_batch = BatchUser()
        new_batch.user = user
        new_batch.batch = selected_batch
        new_batch.active = True
        new_batch.valid_till = self.last_day_of_month(datetime.date.today())
        new_batch.save()
        present, batch_details = self.getBatchDetails(user)
        data = {
            'user_id': user.id,
            'first_name': user.user.first_name,
            'last_name': user.user.last_name,
            'age': user.age,
            'session_active': present,
            'batch_details': batch_details
        }
        res = {
            'success': True,
            'message': 'Sessions booked successfully',
            'data': data
        }

        return Response(res, status.HTTP_200_OK)

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
import random
import string
class Plan(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default='', related_name="plans", null=True)
    sub_user_username = models.CharField(max_length=25)
    sub_user_password = models.CharField(max_length=25)
    gb = models.IntegerField(default=0)
    used = models.DecimalField(max_digits=2, decimal_places=2, default=0.00)
    def __str__(self):
        return self.user.email

    def generateInfo(self, length):
        letters_and_digits = string.ascii_letters + string.digits
        result_str = ''.join((random.choice(letters_and_digits) for i in range(length)))
        return result_str
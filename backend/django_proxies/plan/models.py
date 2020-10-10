from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Plan(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default='', related_name="plans", null=True)
    gb = models.IntegerField(default=0)
    used = models.DecimalField(max_digits=2, decimal_places=2, default=0.00)
    def __str__(self):
        return self.user.username
from django.db import models

# Create your models here.
class Plan(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=120)
    gb_choices = [(1,"1 GB"),(2,"2 GB"),(4,"4 GB")]
    gb = models.CharField(max_length=2, choices=gb_choices, default=0)
    used = models.DecimalField(max_digits=2, decimal_places=2, default=0)
    def __str__(self):
        return self.used
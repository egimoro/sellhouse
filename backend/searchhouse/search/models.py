from django.db import models


class Location(models.Model):
    suburb = models.CharField(max_length=250)
    rooms = models.IntegerField()
    housetype = models.CharField(max_length=3)
    seller = models.CharField(max_length=250)
    date = models.DateField()
    price = models.FloatField(null=True)


    def __str__(self):
        return self.suburb
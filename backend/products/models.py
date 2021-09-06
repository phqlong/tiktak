from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Product(models.Model):

    name = models.CharField(max_length=100, blank=True, default='')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(null=True, blank=True, default=0)

    size = models.IntegerField()
    description = models.TextField(max_length=254, blank=True, default='')

    image = models.ImageField(null=True, blank=True,
                              height_field=None, width_field=None)

    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numRatings = models.IntegerField(null=True, blank=True, default=0)

    def __unicode__(self):
        return str(self.name)


class Review(models.Model):

    # Foreign key
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    title = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __unicode__(self):
        return str(self.createdAt)

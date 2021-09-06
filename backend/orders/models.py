from django.db import models
from products.models import Product
from django.contrib.auth.models import User
# Create your models here.


class Order(models.Model):

    # Foreign key
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    paymentMethod = models.CharField(max_length=100, null=True, blank=True)
    shippingCost = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    totalCost = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)

    # total = models.DecimalField(max_digits=10, decimal_places=2)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    CANCEL = 0
    ORDER = 1
    PAID = 2
    DELIVERY = 3
    SUCCESS = 4
    STATUS_CHOICES = (
        (ORDER, "Ordered"),
        (DELIVERY, "Delivering"),
        (PAID, "Paid"),
        (SUCCESS, "Successful"),
        (CANCEL, "Canceled"),
    )
    status = models.IntegerField(choices=STATUS_CHOICES, default=ORDER)

    def __unicode__(self):
        return str(self.createdAt)


class OrderLine(models.Model):

    # Foreign key
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)

    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)

    quantity = models.IntegerField(default=1)
    sub_total = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return str(self.name)


class Address(models.Model):

    # One to one with order: Each order has unique address
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)

    phone = models.CharField(max_length=12, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)

    def __unicode__(self):
        return str(self.address)

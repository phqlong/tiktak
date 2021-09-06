# from django.db import models

# # Create your models here.

# class Users(models.Model):
#     name = models.CharField(max_length=100, blank=False, default='')
#     gender = models.BooleanField(default=True, help_text="Male is True, Female is False")
#     is_admin = models.BooleanField(default=False)
#     email = models.EmailField()
#     phone = models.IntegerField(max_length=12)
#     address = models.CharField(max_length=100, blank=False, default='')
#     dob = models.DateField()
#     image = models.ImageField(upload_to='images', height_field=None, width_field=None)

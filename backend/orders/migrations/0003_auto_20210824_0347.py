# Generated by Django 3.1.12 on 2021-08-23 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_auto_20210824_0205'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='deliveredAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='paidAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.IntegerField(choices=[(1, 'Ordered'), (3, 'Delivering'), (2, 'Paid'), (4, 'Successful'), (0, 'Canceled')]),
        ),
    ]
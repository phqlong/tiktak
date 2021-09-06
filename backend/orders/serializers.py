from rest_framework import serializers
from users.serializers import UserSerializer
from .models import Order, OrderLine, Address


class OrderSerializer(serializers.ModelSerializer):
    orderLines = serializers.SerializerMethodField(read_only=True)
    address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderLines(self, obj):
        # Order -- One2Many -- Line
        items_line = obj.orderline_set.all()
        serializer = OrderLineSerializer(items_line, many=True)
        return serializer.data
        
    def get_address(self, obj):
        # Order -- One2one -- Add
        try:
            address = AddressSerializer(obj.address, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        # Order -- Many2one -- user
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class OrderLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderLine
        fields = '__all__'

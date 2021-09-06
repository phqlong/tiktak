from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Order, OrderLine, Address
from products.models import Product

from .serializers import OrderSerializer
from products.serializers import ProductSerializer

from rest_framework import status
from datetime import datetime

#### User APIs #############################################################################


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createOrder(request):
    user = request.user
    data = request.data

    orderLines = data['orderLines']

    if orderLines and len(orderLines) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            shippingCost=data['shippingCost'],
            totalCost=data['totalCost']
        )

        # (2) Create shipping address

        shipping = Address.objects.create(
            order=order,
            phone=data['shippingInfo']['phone'],
            address=data['shippingInfo']['address'],
            city=data['shippingInfo']['city'],
            country=data['shippingInfo']['country'],
        )

        # (3) Create order items and set order to orderItem relationship
        for item in orderLines:
            product = Product.objects.get(id=item['product']['id'])

            orderLine = OrderLine.objects.create(
                product=product,
                order=order,
                name=product.name,
                price=product.price,
                image=product.image,
                quantity=item['qty'],
                sub_total=item['qty']*product.price,
            )

            # (4) Update product stock count

            product.quantity -= orderLine.quantity
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


#### Admin APIs #############################################################################

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(id=pk)

    order.isPaid = True
    order.status = order.PAID
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivery(request, pk):
    # Order is delivering
    order = Order.objects.get(id=pk)

    order.isDelivered = True
    order.status = order.DELIVERY
    order.save()

    return Response('Order is being delivering')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToSuccessful(request, pk):
    # Order has been deliveried
    order = Order.objects.get(id=pk)

    order.status = order.SUCCESS
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Deliveried successful')

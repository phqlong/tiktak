from django.urls import path
from .views import *


urlpatterns = [

    path('', getOrders, name='orders'),

    path('add/', createOrder, name='order-add'),
    path('myorders/', getMyOrders, name='myorders'),
    path('<str:pk>/', getOrderById, name='order-by-id'),

    path('<str:pk>/paid/', updateOrderToPaid, name='order-paid'),
    path('<str:pk>/delivery/', updateOrderToDelivery, name='order-delivery'),
    path('<str:pk>/successful/', updateOrderToSuccessful, name='order-successful'),

]

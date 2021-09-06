from django.urls import path
from .views import *

urlpatterns = [

    path('', getProducts, name="products"),

    path('create/', createProduct, name="product-create"),
    path('uploadimg/', uploadProductImage, name="image-upload"),

    path('<str:pk>/reviews/', createProductReview, name="create-review"),
    path('top/', getBestRatingProducts, name='top-products'),
    path('<str:pk>/', getProductById, name="product"),

    path('update/<str:pk>/', updateProductById, name="product-update"),
    path('delete/<str:pk>/', deleteProductById, name="product-delete"),
]

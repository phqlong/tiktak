import logging

from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import Product, Review
from .serializers import ProductSerializer, ReviewSerializer

from rest_framework import status

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("products.views")

#### User APIs #############################################################################

# To-do: Get page sorting, filter product, num items per page
@api_view(['GET'])
def getProducts(request):
    keyword = request.query_params.get('keyword')
    if keyword == None:
        keyword = ''

    # Order_by product by descending CreatedAt (new to old)
    products = Product.objects.filter(name__icontains=keyword)

    limit = request.query_params.get('limit')
    page = request.query_params.get('page')

    if limit == None or not limit.isdigit():
        limit = 4
    else:
        limit = int(limit)

    if page == None or not page.isdigit():
        page = 1
    else:
        page = int(page)

    paginator = Paginator(products, limit)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    logger.info('Page: %d, Limit: %d', page, limit)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getBestRatingProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:4]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProductById(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            title=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        product.numRatings += 1

        # Update average rating for product
        reviews = product.review_set.all()
        avgRating = 0

        for i in reviews:
            avgRating += i.rating
        avgRating /= len(reviews)

        product.rating = avgRating
        product.save()

        return Response('Review Added')


#### Admin APIs #############################################################################

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    data = request.data

    product = Product.objects.create(
        name=data['name'],
        price=data['price'],
        quantity=data['quantity'],
        size=data['size'],
        description=data['description']
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProductById(request, pk):
    data = request.data
    product = Product.objects.get(id=pk)

    product.name = data['name']
    product.price = data['price']
    product.quantity = data['quantity']
    product.size = data['size']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProductById(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response('Producted Deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadProductImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')

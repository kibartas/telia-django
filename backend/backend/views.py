import requests
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError

from backend.serializers import ProductSerializer


def get_unique_brands_and_categories(products):
    unique_brands = set()
    unique_categories = set()
    for product in products:
        unique_brands.add(product["brand"])
        unique_categories.add(product["category"])
    return list(unique_brands), list(unique_categories)


def _get_products():
    response = requests.get("https://dummyjson.com/products")
    data = response.json()
    product_serializer = ProductSerializer(data=data["products"], many=True)
    if product_serializer.is_valid(raise_exception=True):
        unique_brands, unique_categories = get_unique_brands_and_categories(product_serializer.data)
        return unique_brands, unique_categories, product_serializer.data


@api_view(["GET"])
def get_products(_):
    try:
        unique_brands, unique_categories, product_data = _get_products()
    except ValidationError:
        return HttpResponse(status=500)
    return JsonResponse({
        "products": product_data,
        "uniqueBrands": unique_brands,
        "uniqueCategories": unique_categories
    }, status=200)

from unittest import mock
from unittest.mock import Mock

from django.test import TestCase, Client
from rest_framework.exceptions import ValidationError

from backend.views import _get_products, get_unique_brands_and_categories

mock_products = {"products": [{"id": 1, "title": "Phone", "description": "Big phone", "brand": "Biggus", "price": 12, "category": "Phone", "thumbnail": "Fake Photo"}]}
mock_corrupted_products = {"products": "I got nothing"}

mock_products_categories_and_brands = [{"category": "BOB", "brand": "BIG"}, {"category": "BIB", "brand": "BIG"}, {"category": "BOB", "brand": "SMALL"}]


class GetProductsTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    @mock.patch('backend.views.requests.get')
    def test_get_products_success(self, mock_get):
        mock_response = Mock()
        mock_response.json.return_value = mock_products

        mock_get.return_value = mock_response

        response = self.client.get('/products/')

        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["uniqueBrands"], ["Biggus"])
        self.assertEqual(data["uniqueCategories"], ["Phone"])
        self.assertEqual(data["products"], mock_products["products"])

    @mock.patch('backend.views.requests.get')
    def test_get_products_failure(self, mock_get):
        mock_response = Mock()
        mock_response.json.return_value = mock_corrupted_products

        mock_get.return_value = mock_response

        response = self.client.get('/products/')

        self.assertEqual(response.status_code, 500)


class _GetProductsTestCase(TestCase):
    @mock.patch('backend.views.requests.get')
    def test__get_products_success(self, mock_get):
        mock_response = Mock()
        mock_response.json.return_value = mock_products

        mock_get.return_value = mock_response

        unique_brands, unique_categories, products = _get_products()

        self.assertEqual(unique_brands, ["Biggus"])
        self.assertEqual(unique_categories, ["Phone"])
        self.assertEqual(products, mock_products["products"])

    @mock.patch('backend.views.requests.get')
    def test__get_products_serialization_failure(self, mock_get):
        mock_response = Mock()
        mock_response.json.return_value = mock_corrupted_products

        mock_get.return_value = mock_response

        with self.assertRaises(ValidationError):
            _get_products()


class GetUniqueBrandsAndCategoriesTestCase(TestCase):
    def test_get_unique_brands_and_categories_success(self):
        unique_brands, unique_categories = get_unique_brands_and_categories(mock_products_categories_and_brands)

        self.assertListEqual(unique_brands, ["SMALL", "BIG"])
        self.assertListEqual(unique_categories, ["BOB", "BIB"])


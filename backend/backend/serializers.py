from rest_framework import serializers


class ProductSerializer(serializers.Serializer): # noqa
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    brand = serializers.CharField()
    price = serializers.IntegerField()
    category = serializers.CharField()
    thumbnail = serializers.CharField()



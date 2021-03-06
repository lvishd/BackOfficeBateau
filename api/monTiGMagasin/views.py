from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from django.contrib.auth import get_user_model

from monTiGMagasin.config import baseUrl
from monTiGMagasin.models import InfoProduct
from monTiGMagasin.serializers import InfoProductSerializer
from monTiGMagasin.models import ProduitPoissons
from monTiGMagasin.serializers import ProduitPoissonsSerializer
from monTiGMagasin.models import ProduitCrustaces
from monTiGMagasin.serializers import ProduitCrustacesSerializer
from monTiGMagasin.models import ProduitCoquillages
from monTiGMagasin.serializers import ProduitCoquillagesSerializer
from monTiGMagasin.models import Ventes
from monTiGMagasin.serializers import VentesSerializer
from rest_framework.generics import RetrieveAPIView

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username')

class UserApiView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class=UserSerializer

    def get(self):
 
        return self.request.user


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        s
        return Response(content)

class VentesList(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class=UserSerializer
    def get(self, request, format=None):
        products = Ventes.objects.all()
        serializer = VentesSerializer(products, many=True)
        return Response(serializer.data)
   


class InfoProductList(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class=UserSerializer


    def get(self, request, format=None):
        ventes = InfoProduct.objects.all()
        serializer = InfoProductSerializer(ventes, many=True)
        return Response(serializer.data)
        
class InfoProductDetail(APIView):
    def get_object(self, tig_id):
        try:
            return InfoProduct.objects.get(tig_id=tig_id)
        except InfoProduct.DoesNotExist:
            raise Http404
    def get(self, request, tig_id, format=None):
        product = self.get_object(tig_id=tig_id)
        serializer = InfoProductSerializer(product)
        return Response(serializer.data)
        
class ProductIncrementStock(APIView):

    def get_object(self, tig_id):
        try:
            return InfoProduct.objects.get(tig_id=tig_id)
        except InfoProduct.DoesNotExist:
            raise Http404

    def get(self, request, tig_id, number, format=None):
        productBefore = InfoProduct.objects.get(tig_id=tig_id)
        productBefore.quantityInStock = productBefore.quantityInStock + number
        productBefore.save()
        
        product = self.get_object(tig_id=tig_id)
        serializer = InfoProductSerializer(product)
        return Response(serializer.data)
        
class ProductDecrementStock(APIView):

    def get_object(self, tig_id):
        try:
            return InfoProduct.objects.get(tig_id=tig_id)
        except InfoProduct.DoesNotExist:
            raise Http404

    def get(self, request, tig_id, number, format=None):
        productBefore = InfoProduct.objects.get(tig_id=tig_id)
        if productBefore.quantityInStock - number >= 0 :
            productBefore.quantityInStock = productBefore.quantityInStock - number
            productBefore.save()
        
        product = self.get_object(tig_id=tig_id)
        serializer = InfoProductSerializer(product)
        return Response(serializer.data)


class ProductModifyDiscount(APIView):
    def get_object(self, tig_id):
        try:
            return InfoProduct.objects.get(tig_id=tig_id)
        except InfoProduct.DoesNotExist:
            raise Http404

    def get(self, request, tig_id, number, format=None):
        productBefore = InfoProduct.objects.get(tig_id=tig_id)
        if number == 0:
            productBefore.sale = False
            productBefore.discount = 0
        else :
            if number <= 100:
                if productBefore.sale == False:
                    productBefore.sale = True
                productBefore.discount = number
        productBefore.save()

        product = self.get_object(tig_id=tig_id)
        serializer = InfoProductSerializer(product)
        return Response(serializer.data)


class IncrementMultiple(APIView):
    def get_object(self, tig_id):
        try:
            tig_id = self.request.query_params.getlist('id', '')
            return InfoProduct.objects.get(tig_id=tig_id)
        except InfoProduct.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        ids = self.request.query_params.getlist('id', '')
        numbers = self.request.query_params.getlist('number', '')
        for i in range(len(ids)):
            productBefore = InfoProduct.objects.get(tig_id=ids[i])
            productBefore.quantityInStock = productBefore.quantityInStock + int(numbers[i])
            productBefore.save()

        products = InfoProduct.objects.all()
        serializer = InfoProductSerializer(products, many=True)
        return Response(serializer.data)

class DecrementMultiple(APIView):
    def get_object(self, tig_id):
        try:
            tig_id = self.request.query_params.getlist('id', '')
            return InfoProduct.objects.get(tig_id=tig_id)
        except InfoProduct.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        ids = self.request.query_params.getlist('id', '')
        numbers = self.request.query_params.getlist('number', '')
        for i in range(len(ids)):
            productBefore = InfoProduct.objects.get(tig_id=ids[i])
            if productBefore.quantityInStock - int(numbers[i]) >= 0 :
                productBefore.quantityInStock = productBefore.quantityInStock - int(numbers[i])
                productBefore.save()

        products = InfoProduct.objects.all()
        serializer = InfoProductSerializer(products, many=True)
        return Response(serializer.data)


class ModifyDiscountMultiple(APIView):
    def get_object(self, tig_id):
        try:
            tig_id = self.request.query_params.getlist('id', '')
            return InfoProduct.objects.get(tig_id=tig_id)
        except InfoProduct.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        ids = self.request.query_params.getlist('id', '')
        numbers = self.request.query_params.getlist('number', '')
        for i in range(len(ids)):
            productBefore = InfoProduct.objects.get(tig_id=ids[i])
            if int(numbers[i]) == 0:
                productBefore.sale = False
                productBefore.discount = 0
            else:
                if int(numbers[i]) <= 100:
                    if productBefore.sale == False:
                        productBefore.sale = True
                    productBefore.discount = int(numbers[i])
            productBefore.save()

        products = InfoProduct.objects.all()
        serializer = InfoProductSerializer(products, many=True)
        return Response(serializer.data)


class PoissonsproductList(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class=UserSerializer
    def get_object(self, tig_id):
        try:
            return InfoProduct.objects.get(tig_id=tig_id)
        except InfoProduct.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        res = []
        for prod in ProduitPoissons.objects.all():
            serializerPoisson = ProduitPoissonsSerializer(prod)
            product = self.get_object(tig_id=serializerPoisson.data['tigID'])
            serializer = InfoProductSerializer(product)
            res.append(serializer.data)
        return Response(res)

class CrustacesproductList(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class=UserSerializer
    def get_object(self, tig_id):
        try:
            return InfoProduct.objects.get(tig_id=tig_id)
        except InfoProduct.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        res = []
        for prod in ProduitCrustaces.objects.all():
            serializerCrustaces = ProduitCrustacesSerializer(prod)
            product = self.get_object(tig_id=serializerCrustaces.data['tigID'])
            serializer = InfoProductSerializer(product)
            res.append(serializer.data)
        return Response(res)


class CoquillagesproductList(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class=UserSerializer
    def get_object(self, tig_id):
        try:
            return InfoProduct.objects.get(tig_id=tig_id)
        except InfoProduct.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        res = []
        for prod in ProduitCoquillages.objects.all():
            serializerCoquillages = ProduitCoquillagesSerializer(prod)
            product = self.get_object(tig_id=serializerCoquillages.data['tigID'])
            serializer = InfoProductSerializer(product)
            res.append(serializer.data)
        return Response(res)

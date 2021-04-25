from rest_framework.serializers import ModelSerializer
from monTiGMagasin.models import InfoProduct
from monTiGMagasin.models import ProduitPoissons
from monTiGMagasin.models import ProduitCrustaces
from monTiGMagasin.models import ProduitCoquillages
from monTiGMagasin.models import Ventes


class InfoProductSerializer(ModelSerializer):
    class Meta:
        model = InfoProduct
        fields = ('id', 'tig_id','name',  'category', 'price', 'unit', 'availability', 'sale', 'discount', 'comments', 'owner', 'quantityInStock','nombre_produit_vendu')

class VentesSerializer(ModelSerializer):
    class Meta:
        model = Ventes
        fields = ( 'category', 'price','dow','mois', 'year','day' )


class ProduitPoissonsSerializer(ModelSerializer):
    class Meta:
        model = ProduitPoissons
        fields = ('id', 'tigID')


class ProduitCrustacesSerializer(ModelSerializer):
    class Meta:
        model = ProduitCrustaces
        fields = ('id', 'tigID')


class ProduitCoquillagesSerializer(ModelSerializer):
    class Meta:
        model = ProduitCoquillages
        fields = ('id', 'tigID')

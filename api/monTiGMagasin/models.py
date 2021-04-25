from django.db import models

# Create your models here.
class InfoProduct(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tig_id = models.IntegerField(default='-1')
    name = models.CharField(max_length=100, blank=True, default='')
    category = models.IntegerField(default='-1')
    price = models.FloatField(default='0')
    unit = models.CharField(max_length=20, blank=True, default='')
    availability = models.BooleanField(default=True)
    sale = models.BooleanField(default=False)
    discount = models.FloatField(default='0')
    comments = models.CharField(max_length=100, blank=True, default='')
    owner = models.CharField(max_length=20, blank=True, default='tig_orig')
    quantityInStock = models.IntegerField(default='0')
    nombre_produit_vendu = models.IntegerField(default='0')
    
    class Meta:
        ordering = ('name',)


class Ventes(models.Model):
    # created = models.DateTimeField(auto_now_add=True)
    # tig_id = models.IntegerField(default='-1')
    category = models.IntegerField(default='-1')
    price = models.FloatField(default='0')
    dow = models.FloatField(default='-1')
    mois = models.FloatField(default='-1')
    year = models.FloatField(default='-1')
    day = models.FloatField(default='-1')




    class Meta:
        ordering = ('year',)



class ProduitPoissons(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tigID = models.IntegerField(default='-1')

    class Meta:
        ordering = ('tigID',)


class ProduitCrustaces(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tigID = models.IntegerField(default='-1')

    class Meta:
        ordering = ('tigID',)


class ProduitCoquillages(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tigID = models.IntegerField(default='-1')

    class Meta:
        ordering = ('tigID',)

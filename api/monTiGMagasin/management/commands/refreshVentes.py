from django.core.management.base import BaseCommand, CommandError
from monTiGMagasin.models import Ventes
from monTiGMagasin.serializers import VentesSerializer
from monTiGMagasin.config import baseUrl
import requests
import time
import random

class Command(BaseCommand):
    help = 'Refresh the list of products from TiG server.'

    def handle(self, *args, **options):
        self.stdout.write('['+time.ctime()+'] Refreshing data...')
        response = requests.get(baseUrl+'products/')
        jsondata = response.json()
        Ventes.objects.all().delete()
        for product in jsondata:
            for product in jsondata:


                serializer = VentesSerializer(data={
                                                      #   'tig_id':str(product['id']),
                                                        #   'category':str(product['category']),
                                                          'price':random.randint(1,3),
                                                          'dow':random.randint(1,7),
                                                          'mois':random.randint(1,12),
                                                          'year':random.randint(2000,2021),
                                                          'day':random.randint(1,31),



                                     
                                                        })
                if serializer.is_valid():
                    serializer.save()
                    self.stdout.write(self.style.SUCCESS('['+time.ctime()+'] Successfully added product id="%s"' % product['id']))
            self.stdout.write('['+time.ctime()+'] Data refresh terminated.')

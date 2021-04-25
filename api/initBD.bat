python -m pip install djangorestframework-simplejwt
python -m pip install django-cors-headers
python -m pip install PyJWT
python manage.py createsuperuser
python manage.py makemigrations
python manage.py migrate
python manage.py refreshCoquillagesList
python manage.py refreshCrustacesList
python manage.py refreshPoissonsList
python manage.py refreshProductList
python manage.py refreshOnSaleList
python manage.py refreshVentes

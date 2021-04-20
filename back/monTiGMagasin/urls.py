from django.urls import path
from monTiGMagasin import views

urlpatterns = [
    path('infoproducts/', views.InfoProductList.as_view()),
    path('infoproduct/<int:tig_id>/', views.InfoProductDetail.as_view()),
    path('incrementStock/<int:tig_id>/<int:number>/', views.ProductIncrementStock.as_view()),
    path('decrementStock/<int:tig_id>/<int:number>/', views.ProductDecrementStock.as_view()),
    path('modifyDiscount/<int:tig_id>/<int:number>/', views.ProductModifyDiscount.as_view()),
    path('incrementStockMultiple/', views.IncrementMultiple.as_view()),
    path('decrementStockMultiple/', views.DecrementMultiple.as_view()),
    path('modifyDiscountMultiple/', views.ModifyDiscountMultiple.as_view()),
    path('poissons/', views.PoissonsproductList.as_view()),
    path('crustaces/', views.CrustacesproductList.as_view()),
    path('coquillages/', views.CoquillagesproductList.as_view()),
]

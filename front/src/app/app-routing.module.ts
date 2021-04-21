import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageStockComponent } from './manage-stock/manage-stock.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { HomeComponent } from './home/home.component';
//import { HomeComponent } from './home/home.component';
// import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'detailsProduit', component: DetailsProductComponent },
  { path: 'manageStock', component: ManageStockComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    // ChartsModule,
    BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

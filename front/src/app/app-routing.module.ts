import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageStockComponent } from './manage-stock/manage-stock.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { HomeComponent } from './home/home.component';
//import { HomeComponent } from './home/home.component';
// import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'detailsProduit', component: DetailsProductComponent },
  { path: 'manageStock', component: ManageStockComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    // ChartsModule,
    BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

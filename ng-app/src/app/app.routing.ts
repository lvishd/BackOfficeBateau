import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './/home/home.component'
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { DetailsProductComponent } from './details-product/details-product.component';
import { ManageStockComponent } from './manage-stock/manage-stock.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]

    },
    { path: 'detailsProduit', component: DetailsProductComponent,canActivate: [AuthGuard]},
    { path: 'manageStock', component: ManageStockComponent },

    


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
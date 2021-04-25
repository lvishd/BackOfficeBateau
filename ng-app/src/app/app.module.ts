import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ChartsModule } from 'ng2-charts';


import { JwtInterceptor } from './_helpers';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login';
import { ManageStockComponent } from './manage-stock/manage-stock.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import {  ThemeService } from 'ng2-charts';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        ChartsModule,
        FormsModule,


        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        DetailsProductComponent,
        ManageStockComponent,
        

    ],
    providers: [
        ThemeService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true,
 },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
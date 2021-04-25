import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models/user';
import { environment } from 'environments/environment';

 

@Injectable({ providedIn: 'root' })
export class UserService {
    urlApi;

    constructor(public http: HttpClient
        ) {
      this.urlApi = "http://localhost:8000";  
    }
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
        
    }

    
  getProducts(httpOptions){
    return this.http.get(`${environment.api}/infoproducts/`,httpOptions);
  }

  setPromotion(id, discount) {
    return this.http.get(this.urlApi + "/modifyDiscount/" + id + "/" + discount + "/");
  }
  addQuantity(id, quantity,httpOptions){
    return this.http.get(this.urlApi + "/incrementStock/" + id + "/" + quantity + "/",httpOptions);
  }
  removeQuantity(id, quantity,httpOptions) {
    return this.http.get(this.urlApi + "/decrementStock/" + id + "/" + quantity + "/",httpOptions);
  }
  getProductCategories(category,httpOptions){
    return this.http.get(this.urlApi + "/" + category + "/",httpOptions);
  }

  getSales(){
    return this.http.get(this.urlApi + "/ventes/");
  }
}
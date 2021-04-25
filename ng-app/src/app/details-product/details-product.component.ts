import { Component, OnInit } from "@angular/core";
// import { ProductsService } from '../services/products.service';
import { UserService } from "../_services/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "../_services";
import { User } from "../_models";
import { Router } from "@angular/router";

@Component({
  selector: "app-details-product",
  templateUrl: "./details-product.component.html",
  styleUrls: ["./details-product.component.css"],
})
export class DetailsProductComponent implements OnInit {
  currentUser: User;

  products;
  product;
  newPromotion;
  newQuantity;
  salePrice;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    {
      this.newPromotion = "";
      this.authenticationService.currentUser.subscribe((x) => {
        this.currentUser = x;
        console.log(x, "token!!!!!!!!!!XXXX");
        let httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.currentUser.token,
          }),
        };
        this.userService.getProducts(httpOptions).subscribe(
          (res) => {
            this.products = res;
            this.product = this.products[0];
            this.salePrice =
              Math.round(
                (this.product.price / 100) * (100 - this.product.discount) * 100
              ) / 100;
          },
          (err) => {
            alert("failed loading json data");
          }
        );
      });
    }
    this.salePrice = 0;
  }

  ngOnInit() {}

  getProductsAllinit() {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.currentUser.token,
        refreshToken: this.currentUser.refreshToken,
        token: this.currentUser.token,
        token_type: "access",
        user_id: "1",
      }),
    };
    this.userService.getProducts(httpOptions).subscribe(
      (res) => {
        this.products = res;
        this.salePrice =
          Math.round(
            (this.product.price / 100) * (100 - this.product.discount) * 100
          ) / 100;
      },
      (err) => {
        alert("failed loading json data");
      }
    );
  }

  getProductsAll() {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.currentUser.token,
      }),
    };
    this.userService.getProducts(httpOptions).subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        alert("failed loading json data");
      }
    );
  }

  getProductId(tig_id) {
    for (let p of this.products) {
      if (p.tig_id == tig_id) {
        this.product = p;
        console.log(this.product);
      }
    }
  }

  addSale(item) {
    this.salePrice =
      Math.round((item.price / 100) * (100 - this.product.discount) * 100) /
      100;
  }

  onSelectProduct(item) {
    console.log(item);
    this.getProductId(item.tig_id);

    this.addSale(item);
  }

  onModifyPromotion(item) {
    if (this.newPromotion > 100) {
      alert("UNE PROMOTION DE PLUS DE 100% ???");
    } else if (this.newPromotion || this.newPromotion >= 0) {
      this.userService.setPromotion(item.tig_id, this.newPromotion).subscribe(
        (res) => {
          this.product = res;
          this.salePrice =
            Math.round(
              (item.price / 100) * (100 - this.product.discount) * 100
            ) / 100;
        },
        (err) => {
          alert("failed loading json data");
        }
      );
      this.getProductsAll();
    }
  }

  addQuantity(item) {
    if (this.newQuantity > 0) {
      item.quantityInStock += this.newQuantity;
      this.userService
        .addQuantity(item.tig_id, this.newQuantity, this.currentUser)
        .subscribe(
          (res) => {
            this.product = res;
          },
          (err) => {
            alert("failed loading json data");
          }
        );
      this.getProductsAll();
    } else {
      this.newQuantity *= -1;
      this.removeQuantity(item);
    }
  }

  removeQuantity(item) {
    if (item.quantityInStock < this.newQuantity) {
      alert("VOUS ENLEVEZ TTROP DE STOCK");
    } else if (this.newQuantity) {
      item.quantityInStock -= this.newQuantity;
      this.userService
        .removeQuantity(item.tig_id, this.newQuantity, this.currentUser)
        .subscribe(
          (res) => {
            this.product = res;
          },
          (err) => {
            alert("failed loading json data");
          }
        );
      this.getProductsAll();
    }
  }
}

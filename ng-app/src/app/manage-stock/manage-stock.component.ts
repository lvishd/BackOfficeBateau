import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services/user.service";
import { AuthenticationService } from "../_services";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../_models";

@Component({
  selector: "app-manage-stock",
  templateUrl: "./manage-stock.component.html",
  styleUrls: ["./manage-stock.component.css"],
})
export class ManageStockComponent implements OnInit {
  productsPoisson;
  productsCrustaces;
  productsCoquillages;
  newQuantity;
  newPromotion;
  category;
  categories;
  currentUser: User;

  constructor(
    public productsService: UserService,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.categories = [
      { id: 1, name: "poissons", products: null, nameCategory: "Les Poissons" },
      {
        id: 2,
        name: "crustaces",
        products: null,
        nameCategory: "Les Crustacés",
      },
      {
        id: 3,
        name: "coquillages",
        products: null,
        nameCategory: "Les Fruits De Mer",
      },
    ];

    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
      console.log(x, "token!!!!!!!!!!XXXX");
      let httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.currentUser.token,
        }),
      };
      for (let i = 0; i < this.categories.length; i++) {
        this.getProductsCategory(this.categories[i].name, httpOptions);
        console.log(this.categories[i].name);
      }
    });
  }

  ngOnInit() {
    this.newQuantity = [];
    this.newPromotion = [];

    this.getProductId(this.categories[0].nameCategory);
  }

  getProductsAll(httpOptions) {
    for (let i = 0; i < this.categories.length; i++) {
      this.getProductsCategory(this.categories[i].name, httpOptions);
      console.log(this.categories[i].name);
    }
  }

  getProductsCategory(nom_category, httpOptions) {
    this.productsService
      .getProductCategories(nom_category, httpOptions)
      .subscribe(
        (res) => {
          console.log("lenghth:", this.categories.length);

          for (let i = 0; i < this.categories.length; i++)
            if (this.categories[i].name == nom_category) {
              this.categories[i].products = res;
              // this.categories[i].nameCategory=nom_category;
            }
        },
        (err) => {
          alert("failed loading json data");
        }
      );
  }

  onSelectProduct(item) {
    this.getProductId(item.nameCategory);
    console.log(item.nameCategory);
  }

  getProductId(nameCategory) {
    for (let p of this.categories) {
      if (p.nameCategory == nameCategory) {
        this.category = p;
        console.log(this.category);
      }
    }
  }
  onModifyPromotion() {
    for (let tig_id = 0; tig_id < this.newPromotion.length; tig_id++) {
      if (this.newPromotion[tig_id]) {
        this.productsService
          .setPromotion(tig_id, this.newPromotion[tig_id])
          .subscribe(
            (res) => {
              res;
            },
            (err) => {
              alert("failed loading json data");
            }
          );
      }
    }
    console.log(this.newPromotion);
  }

  addQuantity(httpOptions) {
    for (let tig_id = 0; tig_id < this.newQuantity.length; tig_id++) {
      if (this.newQuantity[tig_id] < 0) {
        this.newQuantity[tig_id] *= -1;
        this.productsService
          .removeQuantity(tig_id, this.newQuantity[tig_id], httpOptions)
          .subscribe(
            (res) => {
              res;
              this.getProductsAll(httpOptions);
            },
            (err) => {
              alert(err + "failed loading json data(Remove");
            }
          );
      } else if (this.newQuantity[tig_id]) {
        this.productsService
          .addQuantity(tig_id, this.newQuantity[tig_id], httpOptions)
          .subscribe(
            (res) => {
              res;
              this.getProductsAll(httpOptions);
            },
            (err) => {
              alert(err + "failed loading json Ddata");
            }
          );
      }
    }
    console.log(this.newQuantity);
  }

  modifyStock() {
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
      console.log(x, "token!!!!!!!!!!XXXX");
      let httpOptions = {
        headers: new HttpHeaders({
          // "token_type": "access",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.currentUser.token,
        }),
      };
    });
    this.addQuantity(this.currentUser);
    this.onModifyPromotion();
    this.getProductsAll(this.currentUser);
  }
}

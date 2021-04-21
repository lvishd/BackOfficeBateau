import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../services/products.service";

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
  // = [
  //   { id: 1, name: "poissons", products: null, nameCategory: "Les Poissons" },
  //   { id: 2, name: "crustaces", products: null, nameCategory: "Les Crustacés" },
  //   {
  //     id: 3,
  //     name: "coquillages",
  //     products: null,
  //     nameCategory: "Les Fruits De Mer",
  //   },
  // ];

  constructor(public productsService: ProductsService) {
    this.categories = [
      { id: 1, name: "poissons", products: null, nameCategory: "Les Poissons" },
      { id: 2, name: "crustaces", products: null, nameCategory: "Les Crustacés" },
      {
        id: 3,
        name: "coquillages",
        products: null,
        nameCategory: "Les Fruits De Mer",
      },
    ];



  }

  ngOnInit() {
    this.newQuantity = [];
    this.newPromotion = [];
    console.log(this.categories[2].nameCategory)
    console.log(this.category)

    console.log(this.categories)
    console.log(this.category)
    this.getProductsAll();


    console.log(this.categories[0].nameCategory)

    this.getProductId(this.categories[0].nameCategory)
    // this.onSelectProduct(this.categories[1].nameCategory);
    // this.category=
  }

  getProductsAll() {
    for (let i = 0; i < this.categories.length; i++) {
      this.getProductsCategory(this.categories[i].name);
      console.log(this.categories[i].name);
    }
  }

  getProductsCategory(nom_category) {
    this.productsService.getProductCategories(nom_category).subscribe(
      (res) => {
        console.log("lenghth:",this.categories.length);

        for (let i = 0; i < this.categories.length; i++)
          if (this.categories[i].name == nom_category){
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

    // this.copyDiscount = item.discount
    // this.copyQuantity = item.quantityInStock
    // this.addSale(item)
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

  addQuantity() {
    for (let tig_id = 0; tig_id < this.newQuantity.length; tig_id++) {
      if (this.newQuantity[tig_id] < 0) {
        this.newQuantity[tig_id] *= -1;
        this.productsService
          .removeQuantity(tig_id, this.newQuantity[tig_id])
          .subscribe(
            (res) => {
              res
              this.getProductsAll();
            },
            (err) => {
              alert(err + "failed loading json data(Remove");
            }
          );
      } else if (this.newQuantity[tig_id]) {
        this.productsService
          .addQuantity(tig_id, this.newQuantity[tig_id])
          .subscribe(
            (res) => {
              res
              this.getProductsAll();
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
    this.addQuantity();
    this.onModifyPromotion();
    this.getProductsAll();
  }
}

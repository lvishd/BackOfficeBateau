import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  products;
  product;
  newPromotion;
  newQuantity;
  salePrice;
  // copyDiscount;
  // copyQuantity

  constructor(public productsService: ProductsService) {
    // this.products = [];
    // this.product=this.products[14];
    this.salePrice = 0;
    // this.copyDiscount=0;
    // this.copyQuantity=0;



  }

  ngOnInit() {
    this.getProductsAllcopy();
    
    // this.addSale(this.products[0]);
    // this.getProductId(12)
    // console.log(this.products)

    this.getProductId(12)
    this.getProductId(2)
    // this.getProductId(this.products[1].tig_id)

    

    // this.getProductId(1);
    this.onSelectProduct(this.products[8].tig_id);
    // console.log(this.product)
    this.product=this.products[1];
  }

  getProductsAllcopy() {
    this.productsService.getProducts().subscribe(res => {
      this.products = res;
      this.product=this.products[0];
      // console.log(this.products[1])
      console.log(this.products)
      this.salePrice = Math.round(((this.products[0].price / 100) * (100 - this.products[0].discount)) * 100) / 100

      

    },
      (err) => {
        alert('failed loading json data');
      });
  }


  getProductsAll() {
    this.productsService.getProducts().subscribe(res => {
      this.products = res;
      // this.product=this.products[0];
      // console.log(this.products[1])
      console.log(this.products)

      

    },
      (err) => {
        alert('failed loading json data');
      });
  }

  getProductId(tig_id) {
    for (let p of this.products) {
      if (p.tig_id == tig_id) {
        this.product = p;
        console.log(this.product)
      }
    }
  }


  addSale(item) {
    // this.copyDiscount = item.discount
    this.salePrice = Math.round(((item.price / 100) * (100 - this.product.discount)) * 100) / 100

  }

  onSelectProduct(item) {
    console.log(item)
    this.getProductId(item.tig_id)
    // this.copyDiscount = item.discount
    // this.copyQuantity = item.quantityInStock
    this.addSale(item)
  }
  
  // onSelectProductId(tigId) {
  //   this.getProductId(tigId)
  // }

  onModifyPromotion(item) {

    if (this.newPromotion > 100) {
  
      alert('UNE PROMOTION DE PLUS DE 100% ???');
    }

    else if (this.newPromotion || this.newPromotion >=0 ) {
      // this.copyDiscount= this.newPromotion
      this.productsService.setPromotion(item.tig_id, this.newPromotion).subscribe(res => {
      this.product = res;
      this.salePrice = Math.round(((item.price / 100) * (100 - this.product.discount)) * 100) / 100

      },
        (err) => {
          alert('failed loading json data');
        });
      this.getProductsAll();
    }
  }

  addQuantity(item) {

    // console.log(this.copyQuantity , this.newQuantity)

    if (this.newQuantity > 0) {
      item.quantityInStock+= this.newQuantity
      this.productsService.addQuantity(item.tig_id, this.newQuantity).subscribe(res => {
        this.product = res;
      },
        (err) => {
          alert('failed loading json data');
        });
      this.getProductsAll();
    }
    else{
      this.newQuantity*=-1
      this.removeQuantity(item)


    }
  } 

  removeQuantity(item) {

    // console.log(this.copyQuantity , this.newQuantity)
    if (item.quantityInStock < this.newQuantity) {
  
      alert('VOUS ENLEVEZ TTROP DE STOCK');
      // console.log("BOOOP")

    }

    else if (this.newQuantity) {
      // console.log("this.copyQuantity > this.newQuantity")

      item.quantityInStock-= this.newQuantity
      this.productsService.removeQuantity(item.tig_id, this.newQuantity).subscribe(res => {
        this.product = res;
      },
        (err) => {
          alert('failed loading json data');
        });
      this.getProductsAll();
    }
  }

  // getPercent ()




}

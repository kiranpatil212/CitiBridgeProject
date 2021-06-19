import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private loggedInStatus = false 

  serviceUrl = "http://localhost:8088";

  isValidUser: boolean = false;
  
  constructor( private _http : HttpClient ) { }

  checkLogin(user :User): Observable<any> {
    return this._http.post(this.serviceUrl+ "/user/login",user)
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }
  
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  getUserName() {
    
  }



//   status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

//     productNames: string[] = [
//         "Bamboo Watch", 
//         "Black Watch", 
//         "Blue Band", 
//         "Blue T-Shirt", 
//         "Bracelet", 
//         "Brown Purse", 
//         "Chakra Bracelet",
//         "Galaxy Earrings",
//         "Game Controller",
//         "Gaming Set",
//         "Gold Phone Case",
//         "Green Earbuds",
//         "Green T-Shirt",
//         "Grey T-Shirt",
//         "Headphones",
//         "Light Green T-Shirt",
//         "Lime Band",
//         "Mini Speakers",
//         "Painted Phone Case",
//         "Pink Band",
//         "Pink Purse",
//         "Purple Band",
//         "Purple Gemstone Necklace",
//         "Purple T-Shirt",
//         "Shoes",
//         "Sneakers",
//         "Teal T-Shirt",
//         "Yellow Earbuds",
//         "Yoga Mat",
//         "Yoga Set",
//     ];


//     getProductsSmall() {
//         return this._http.get<any>('assets/products-small.json')
//         .toPromise()
//         .then(res => <Product[]>res.data)
//         .then(data => { return data; });
//     }

//     getProducts() {
//         return this._http.get<any>('assets/products.json')
//         .toPromise()
//         .then(res => <Product[]>res.data)
//         .then(data => { return data; });
//     }

//     getProductsWithOrdersSmall() {
//         return this._http.get<any>('assets/products-orders-small.json')
//         .toPromise()
//         .then(res => <Product[]>res.data)
//         .then(data => { return data; });
//     }

//     generatePrduct(): Product {
//         const product: Product =  {
//             id: this.generateId(),
//             name: this.generateName(),
//             description: "Product Description",
//             price: this.generatePrice(),
//             quantity: this.generateQuantity(),
//             category: "Product Category",
//             inventoryStatus: this.generateStatus(),
//             rating: this.generateRating()
//         };

//         product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
//         return product;
//     }

//     generateId() {
//         let text = "";
//         let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
//         for (var i = 0; i < 5; i++) {
//             text += possible.charAt(Math.floor(Math.random() * possible.length));
//         }
        
//         return text;
//     }

//     generateName() {
//         return this.productNames[Math.floor(Math.random() * Math.floor(30))];
//     }

//     generatePrice() {
//         return Math.floor(Math.random() * Math.floor(299)+1);
//     }

//     generateQuantity() {
//         return Math.floor(Math.random() * Math.floor(75)+1);
//     }

//     generateStatus() {
//         return this.status[Math.floor(Math.random() * Math.floor(3))];
//     }

//     generateRating() {
//         return Math.floor(Math.random() * Math.floor(5)+1);
//     }
}
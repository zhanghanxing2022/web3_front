import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products = products;
  constructor(public http: HttpClient)
  {}

  share() {
    window.alert('The product has been shared!');
  }  
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  // throw new Error('Method not implemented.');
  }
  greeting() {
    var api = 'http://localhost:8080/greeting';
    const name = sessionStorage.getItem("userID");
    if(name)
    {
      api+="?name="+name;
    }
    this.http.get(`${api}`).subscribe((response: any) => {
      window.alert(response.name);
    });
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
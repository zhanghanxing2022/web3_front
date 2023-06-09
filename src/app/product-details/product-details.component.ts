import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { products } from '../products';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  product: any;

  constructor(private route:ActivatedRoute,)
  {

  }
  ngOnInit(): void {
      this.route.paramMap.subscribe(params=>{
          this.product = products[0+Number(params.get('productId'))];
      });
  }

}

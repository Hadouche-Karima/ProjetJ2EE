import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId!:string;
  constructor(private route:ActivatedRoute) {
    this.productId=this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

}

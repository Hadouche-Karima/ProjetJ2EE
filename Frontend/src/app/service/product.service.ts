import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {throws} from "assert";
import {PageProduct, Product} from "../Models/model.product";
import {FormGroup} from "@angular/forms";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!:Array<Product>

  constructor() {
    this.products=[
      {id:UUID.UUID(),name:"Computer",price:6500,promotion:true},
      {id:UUID.UUID(),name:"Printer",price :4500,promotion:false},
      {id:UUID.UUID(),name: "Smart phone",price:1200,promotion:true}
    ];
    for(let i=0;i<10;i++){
      this.products.push({id:UUID.UUID(),name:"Computer",price:6500,promotion:true})
      this.products.push({id:UUID.UUID(),name:"Computer",price:6500,promotion:true})
      this.products.push({id:UUID.UUID(),name:"Computer",price:6500,promotion:true})
      this.products.push({id:UUID.UUID(),name:"Computer",price:6500,promotion:true})

    }
  }

  public getAllProducts():Observable<Array<Product>>{
    let rd=Math.random();
    if(rd<0.1 ) return throwError(()=>new Error("Internet connexion"))
    return of(this.products);
  }

  public setPagesProducts(page:number,size:number):Observable<PageProduct>{
    let index=page*size;
    let totalPages= ~~(this.products.length/size);
    if(this.products.length % size!=0) totalPages++;
    let pageProducts=this.products.slice(index,index+size);
    return of({
      page:page,
      size:size,
      totalPages:totalPages,
      products:pageProducts
    })
  }

  public DeleteProduct(id:string):Observable<boolean>{
    this.products=this.products.filter((prod:Product)=>prod.id!=id);
    return of(true);
  }

  public setPromotion(id:string):Observable<boolean>{
    let prod=this.products.find(p=>p.id==id);
   if(prod?.promotion!=undefined) {
     prod.promotion!=prod.promotion
     return of(true);
   }
    else
        return throwError(()=>new Error("product not found"));
  }

  searchProduct(keyword:string,page:number,size:number):Observable<PageProduct>{
    let results=this.products.filter(p=>p.name.includes(keyword));
    let index=page*size;
    let totalPages= ~~(results.length/size);
    if(results.length % size!=0) totalPages++;
    let pageProducts=results.slice(index,index+size);
    return of({
      page:page,
      size:size,
      totalPages:totalPages,
      products:pageProducts
    })
    return of({
      page:page,
      size:size,
      totalPages:totalPages,
      products:pageProducts
    })
  }

  public addNewProduct(product:Product):Observable<Product>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(product);
  }

  public  setProduct(id:string):Observable<Product>{
    let product= this.products.find((p)=>p.id==id)
    if(product==undefined) return throwError(()=>new Error("Product not found"));

  }
  }

import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../Models/model.product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../service/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products!:Array<Product>;
   erroMsg!:String;
  searchFormGroup!:FormGroup;
  currentPage:number=0;
  pageSize:number=5;
  totalPage:number=0;
  constructor(private productServis:ProductService,private fg:FormBuilder,
              public authService:AuthentificationService,
              private router:Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fg.group({
      keyword:this.fg.control(null)
    })
      this.handleGetPagesProducts();
  }
  handleGetAllProducts(){
    this.productServis.getAllProducts().subscribe({
      next:(data)=>{
        this.products=data;
      },
      error:(err)=>{
        this.erroMsg=err;
      }
    });
  }
  handleGetPagesProducts(){
        this.productServis.setPagesProducts(this.currentPage,this.pageSize).subscribe({
                                                  next:(data)=>{
                                                    this.products=data.products;
                                                    this.totalPage=data.totalPages;
                                                  },
                                                  error:(err)=>{
                                                    this.erroMsg=err;
                                                  }
                                                  });
}
  deleteProd(p:Product){
    let conf=confirm("Are u sure ?");
    if(!conf) return ;
    return this.productServis.DeleteProduct(p.id).subscribe({
      next:(data)=>{
       // this.handleGetAllProducts();
        let index=this.products.indexOf(p);
        this.products.splice(index,1);
      }
    })
  }

  handlePromotion(p:Product) {
    let promo=p.promotion
        this.productServis.setPromotion(p.id).subscribe({
          next:(data)=>{
            p.promotion=!promo
          },
          error:(err)=>{
            this.erroMsg=err ;
          }
        })
  }

  handleSearchProducts() {
    let keyword=this.searchFormGroup.value.keyword;
    this.productServis.searchProduct(keyword,this.currentPage,this.pageSize).subscribe({
      next:(data)=>{
        this.products=data.products;
        this.totalPage=data.totalPages;
      }
    })
  }

  gotoPage(i: number) {
    this.currentPage=i;
    this.handleGetPagesProducts();
  }

  handleNewProduct() {
      this.router.navigateByUrl("/admin/newProduct");
  }

  handleEditProduct(p: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${p.id}`);
  }
}

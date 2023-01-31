import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validator, Validators} from "@angular/forms";
import {ProductService} from "../service/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productFormGroup!:FormGroup;
  constructor(private fb:  FormBuilder , private prodService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      price:this.fb.control(null,[Validators.required,Validators.minLength(200)]),
      promotion:this.fb.control(false,[Validators.required]),

    })
  }

  handleAddProduct() {
      let product=this.productFormGroup.value
    this.prodService.addNewProduct(product).subscribe({
      next:(data)=>{
        alert("Product added successfully");
        this.productFormGroup.reset();
        this.router.navigateByUrl("/admin/products");
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getErrorMessage(field: string, errors: ValidationErrors) {
      if(errors['required']){
        return field+" is Required";
      }
      else if(errors['minlength'])
          return field+" should have at least "+errors['minlength']['requiredLength']+" Characters";
      else if(errors['min']){
        return field+" should have min value"+errors['min']['min'];
      }
      else
          return  '';
  }
}

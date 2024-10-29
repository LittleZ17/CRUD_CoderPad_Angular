import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';
import { FormProductComponent } from './form-product/form-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    FormProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    SharedModule,
    HttpClientModule,
  ]
})
export class ProductsModule { }

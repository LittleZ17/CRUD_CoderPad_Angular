import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { FormProductComponent } from './form-product/form-product.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'new', component: FormProductComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

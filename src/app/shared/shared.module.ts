import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { CustomButtonComponent } from './button/button.component';



@NgModule({
  declarations: [
    SearchComponent,
    PaginatorComponent,
    CustomButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    SearchComponent,
    PaginatorComponent,
    CustomButtonComponent
  ]
})
export class SharedModule { }

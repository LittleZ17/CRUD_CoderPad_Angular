import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './components/search/search.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CustomButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    SearchComponent,
    PaginatorComponent,
    CustomButtonComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    SearchComponent,
    PaginatorComponent,
    CustomButtonComponent,
    ModalComponent
  ]
})
export class SharedModule { }

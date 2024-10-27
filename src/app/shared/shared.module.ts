import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    SearchComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }

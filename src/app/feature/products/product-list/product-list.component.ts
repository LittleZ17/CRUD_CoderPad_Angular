import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { TEXT } from 'src/app/shared/utils';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  @Input() productsData: Product[] = [];

  textHtml = TEXT.table;

  constructor() {}
}

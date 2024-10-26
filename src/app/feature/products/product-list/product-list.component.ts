import { Component, OnInit } from '@angular/core';
import { ApiResponse, Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  searchProduct: string = '';

  currentPage: number = 1;
  itemsPage: number = 5 | 10 | 15;


  constructor(private readonly _productsSrv: ProductService) { }


  ngOnInit(): void {
    this._loadProducts();
  }

  private _loadProducts() {
    this._productsSrv.getProducts().subscribe(data => {
      this.products = data;
    })
  }



}

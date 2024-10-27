import { Component, OnInit } from '@angular/core';
import { ApiResponse, Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { PRODUCT_STUB } from 'src/app/core/stubs/products.stubs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  showProductsPerPage: Product[] = []; 
  searchProduct: string = '';

  // HANDLE PAGINATOR
  totalProducts: number = 0;
  productsPerPage: number = 5;
  currentPage: number = 1;


  constructor(private readonly _productsSrv: ProductService) { }


  ngOnInit(): void {
    this._loadProducts();
  }

  private _loadProducts() {
    this._productsSrv.getProducts().subscribe(data => {
      this.products = data;
      this.totalProducts = this.products.length;
      this._updateListProductShow();
    })
  }

  onPageChange(page: number){
    this.currentPage = page;
    this._updateListProductShow();
  }

  productsPerPageChange(numPerPage: number){
    this.productsPerPage = numPerPage;
    this.currentPage = 1;
    this._updateListProductShow();
  }

  private _updateListProductShow(){
    const startIdx = (this.currentPage - 1) * this.productsPerPage;
    this.showProductsPerPage = this.products.slice(startIdx, startIdx + this.productsPerPage)
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TEXT } from 'src/app/shared/utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  showProductsPerPage: Product[] = [];

  searchProduct: string = '';

  // HANDLE PAGINATOR
  totalProducts: number = 0;
  productsPerPage: number = 5;
  currentPage: number = 1;

  ROUTE_NEW: string = 'products/new'


  constructor(
    private readonly _productsSrv: ProductService,
    private readonly _modalSrv: ModalService,
    private readonly _router: Router,
  ) { }


  ngOnInit(): void {
    this._loadProducts();
  }

  private _loadProducts() {
    this._productsSrv.getProducts().subscribe(data => {
      if (!data.data) {
        return;
      }
      this.products = data.data;
      this.totalProducts = this.products.length;
      this._updateListProductShow();
    })
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this._updateListProductShow();
  }

  productsPerPageChange(numPerPage: number) {
    this.productsPerPage = numPerPage;
    this.currentPage = 1;
    this._updateListProductShow();
  }

  private _updateListProductShow() {
    const filteredProductBySearch = this.filterProductBySearch();

    this.totalProducts = filteredProductBySearch.length;

    if (this.currentPage > Math.ceil(this.totalProducts / this.productsPerPage) && this.totalProducts > 0) {
      this.currentPage = 1;
    }

    const startIdx = (this.currentPage - 1) * this.productsPerPage;
    this.showProductsPerPage = filteredProductBySearch.slice(startIdx, startIdx + this.productsPerPage)
  }

  filterProductBySearch(): Product[] {
    if (!this.searchProduct) {
      return this.products;
    }

    const query = this.searchProduct.toLowerCase();
    const filtered = this.products.filter(product =>
      product.name.toLowerCase().includes(query)
    );

    return filtered;
  }

  onSearchChange(termSearch: string): void {
    this.searchProduct = termSearch;
    this.currentPage = 1
    this._updateListProductShow();
  }

  navigateAddNewProduct() {
    this._router.navigate([this.ROUTE_NEW])
  }

  onProductDeleted(productId: string) {
    this._productsSrv.deleteProduct(productId).subscribe({
      next: (res) => {
        this._modalSrv.hide();
        this._loadProducts();
      },
      error: (err) => {
        let errorMsg = TEXT.error;
        
        if (err.error && err.error.message) {
          errorMsg = err.error.message; 
        }
        this._modalSrv.show(errorMsg, false)
      },
      complete: () => this._modalSrv.show(TEXT.modal.OKDelete, false)
    });
  }

}

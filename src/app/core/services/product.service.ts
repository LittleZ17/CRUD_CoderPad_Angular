import { Injectable } from '@angular/core';
import { Product, ApiResponse } from '../models/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { PRODUCT_STUB } from '../stubs/products.stubs';
import { TEXT } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _urlApi: string = '/bp/products';


  constructor(private readonly _http: HttpClient) { }

  getProducts(): Observable<ApiResponse<Product[]>> {
    return this._http.get<ApiResponse<Product[]>>(this._urlApi)
      .pipe(
        catchError(this._handleError)
      );
    // return of(PRODUCT_STUB)
  }

  verificationIdExist(productId: string): Observable<boolean> {
    return this._http.get<boolean>(`${this._urlApi}/verification/${productId}`)
      .pipe(
        catchError(this._handleError)
      );
    // return of(false)
  }

  addProduct(newProduct: Product): Observable<ApiResponse<Product>> {
    return this._http.post<ApiResponse<Product>>(this._urlApi, newProduct)
      .pipe(
        catchError(this._handleError)
      );
  }

  updateProduct(product: Product): Observable<ApiResponse<Product>> {
    return this._http.put<ApiResponse<Product>>(`${this._urlApi}/${product.id}`, product)
      .pipe(
        catchError(this._handleError)
      );
  }

  deleteProduct(productId: string): Observable<ApiResponse<void>> {
    return this._http.delete<ApiResponse<void>>(`${this._urlApi}uy/${productId}`)
      .pipe(
        catchError(this._handleError)
      );
  }

  private _handleError(error: HttpErrorResponse) {
    let errorMsg = TEXT.error; 
    if (error.error && error.error.message) {
        errorMsg = error.error.message;
   
    return throwError(() => new Error(errorMsg));
    }
    return throwError(() => new Error(errorMsg)); 
  }
}

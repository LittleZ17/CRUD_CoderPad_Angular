import { Injectable } from '@angular/core';
import { Product, ApiResponse } from '../models/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { PRODUCT_STUB } from '../stubs/products.stubs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _urlApi = "http://localhost:3002/bp/products";

  constructor(private readonly _http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    // return this._http.get<Product[]>(this._urlApi)
    //   .pipe(
    //     catchError(this._handleError)
    //   );
    return of(PRODUCT_STUB)
  }

  verificationIdExist(productId: string): Observable<boolean> {
    // return this._http.get<boolean>(`${this._urlApi}/verification/${productId}`)
    //   .pipe(
    //     catchError(this._handleError)
    //   );
    return of(false)
  }

  addProduct(newProduct: Product): Observable<ApiResponse<Product>> {
    return this._http.post<ApiResponse<Product>>(this._urlApi, newProduct)
      .pipe(
        catchError(this._handleError)
      );
  }

  updateProduct(product: Product): Observable<ApiResponse<Product>> {
    return this._http.put<ApiResponse<Product>>(this._urlApi, product)
      .pipe(
        catchError(this._handleError)
      );
  }

  deleteProduct(productId: string): Observable<ApiResponse<void>> {
    return this._http.delete<ApiResponse<void>>(`${this._urlApi}/${productId}`)
      .pipe(
        catchError(this._handleError)
      );
  }

  private _handleError(error: HttpErrorResponse) {
    let errorMsg = 'Error';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      const apiErrorResponse = error.error;
      errorMsg = `Error: ${apiErrorResponse.message} - ${apiErrorResponse.name} `
    }
    return throwError(errorMsg);
  }
}

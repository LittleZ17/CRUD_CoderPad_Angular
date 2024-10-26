import { Injectable } from '@angular/core';
import { Product, ApiResponse } from '../models/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _urlApi = "http://localhost:3002/bp/products";

  constructor(private readonly _http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._urlApi)
      .pipe(
        catchError(this._handleError)
      );
  }

  getProductById(productId: string): Observable<Product> {
    return this._http.get<Product>(`${this._urlApi}/${productId}`)
      .pipe(
        catchError(this._handleError)
      );
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

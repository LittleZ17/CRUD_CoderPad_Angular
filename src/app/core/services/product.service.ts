import { Injectable } from '@angular/core';
import { Product, ApiResponse } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _urlApi: string = '/bp/products';


  constructor(private readonly _http: HttpClient) { }

  getProducts(): Observable<ApiResponse<Product[]>> {
    return this._http.get<ApiResponse<Product[]>>(this._urlApi)
  }

  verificationIdExist(productId: string): Observable<boolean> {
    return this._http.get<boolean>(`${this._urlApi}/verification/${productId}`)
  }

  addProduct(newProduct: Product): Observable<ApiResponse<Product>> {
    return this._http.post<ApiResponse<Product>>(this._urlApi, newProduct)
      
  }

  updateProduct(product: Product): Observable<ApiResponse<Product>> {
    return this._http.put<ApiResponse<Product>>(`${this._urlApi}/${product.id}`, product)
      
  }

  deleteProduct(productId: string): Observable<ApiResponse<any>> {
    return this._http.delete<ApiResponse<any>>(`${this._urlApi}/${productId}`)
      
  }
}

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product, ApiResponse } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const apiUrl = '/bp/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should retrieve products from the API via GET', () => {
      const dummyProducts: ApiResponse<Product[]> = {
        message: 'Products retrieved successfully',
        data: [
          {
            id: '1',
            name: 'Product 1',
            description: 'Description 1',
            logo: 'logo1.png',
            date_release: new Date('2023-01-01'),
            date_revision: new Date('2023-02-01')
          },
          {
            id: '2',
            name: 'Product 2',
            description: 'Description 2',
            logo: 'logo2.png',
            date_release: new Date('2023-01-05'),
            date_revision: new Date('2023-02-05')
          }
        ],
      };

      service.getProducts().subscribe(products => {
        expect(products.data?.length).toBe(2);
        expect(products).toEqual(dummyProducts);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProducts);
    });
  });

  describe('verificationIdExist', () => {
    it('should return true if the product ID exists', () => {
      const productId = '123';
      const exists = true;

      service.verificationIdExist(productId).subscribe(response => {
        expect(response).toBeTrue();
      });

      const req = httpMock.expectOne(`${apiUrl}/verification/${productId}`);
      expect(req.request.method).toBe('GET');
      req.flush(exists);
    });
  });

  describe('addProduct', () => {
    it('should add a product and return the added product', () => {
      const newProduct: Product = {
        id: '3',
        name: 'Product 3',
        description: 'Description 3',
        logo: 'logo3.png',
        date_release: new Date('2023-03-01'),
        date_revision: new Date('2023-03-02')
      };
      const response: ApiResponse<Product> = {
        message: 'Product added successfully',
        data: newProduct,
      };

      service.addProduct(newProduct).subscribe(res => {
        expect(res.data).toEqual(newProduct);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });
  });

  describe('updateProduct', () => {
    it('should update a product and return the updated product', () => {
      const updatedProduct: Product = {
        id: '1',
        name: 'Updated Product 1',
        description: 'Updated Description 1',
        logo: 'updated_logo1.png',
        date_release: new Date('2023-01-01'),
        date_revision: new Date('2023-02-01')
      };
      const response: ApiResponse<Product> = {
        message: 'Product updated successfully',
        data: updatedProduct,
      };

      service.updateProduct(updatedProduct).subscribe(res => {
        expect(res.data).toEqual(updatedProduct);
      });

      const req = httpMock.expectOne(`${apiUrl}/${updatedProduct.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(response);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and return success', () => {
      const productId = '1';
      const response: ApiResponse<any> = {
        message: 'Product deleted successfully',
        data: null,
      };

      service.deleteProduct(productId).subscribe(res => {
        expect(res.message).toBe('Product deleted successfully');
      });

      const req = httpMock.expectOne(`${apiUrl}/${productId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(response);
    });
  });
});

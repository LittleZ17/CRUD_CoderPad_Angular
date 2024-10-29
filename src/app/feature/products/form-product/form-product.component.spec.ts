import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { FormProductComponent } from './form-product.component';
import { Product } from 'src/app/core/models/product';
import { TEXT } from 'src/app/shared/utils';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let modalService: jasmine.SpyObj<ModalService>;
  let router: jasmine.SpyObj<Router>;

  const mockProduct: Product = {
    id: '123456',
    name: 'Test Product',
    description: 'This is a test product.',
    logo: 'logo.png',
    date_release: new Date('2024-01-01'),
    date_revision: new Date('2025-01-01'),
  };

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['addProduct', 'updateProduct', 'verificationIdExist']);
    const modalServiceSpy = jasmine.createSpyObj('ModalService', ['show']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [FormProductComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the form product component', () => {
    expect(component).toBeTruthy();
  });


});

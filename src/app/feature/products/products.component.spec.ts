import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductService } from 'src/app/core/services/product.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product, ApiResponse } from 'src/app/core/models/product';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsModule } from './products.module';
import { PRODUCT_STUB } from 'src/app/core/stubs/products.stubs';

const dataMock= PRODUCT_STUB


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let spyProductSrv: jasmine.SpyObj<ProductService>;
  let spyModalSrv: jasmine.SpyObj<ModalService>;
  let spyRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    spyProductSrv = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    spyModalSrv = jasmine.createSpyObj('ModalService', ['show', 'hide']);
    spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule,
        ProductsModule
      ],
      declarations: [ProductsComponent],
      providers: [
        ProductService,
        ModalService,
        { provide: ProductService, useValue: spyProductSrv },
        { provide: ModalService, useValue: spyModalSrv },
        { provide: Router, useValue: spyRouter },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

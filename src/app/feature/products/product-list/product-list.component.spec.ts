import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { ApiResponse, Product } from 'src/app/core/models/product';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let spyModalSrv: jasmine.SpyObj<ModalService>;
  let spyRouter: jasmine.SpyObj<Router>;
  let spyProductService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    spyModalSrv = jasmine.createSpyObj('ModalService', ['show', 'hide']);
    spyRouter = jasmine.createSpyObj('Router', ['navigate']);
    spyProductService = jasmine.createSpyObj('ProductService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ProductListComponent],
      providers: [
        { provide: ModalService, useValue: spyModalSrv },
        { provide: Router, useValue: spyRouter },
        { provide: ProductService, useValue: spyProductService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});

import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, distinctUntilChanged, map, of } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TEXT } from 'src/app/shared/utils';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  isEditMode: boolean = false;

  productForm: FormGroup;
  product?: Product;

  textHtml = TEXT.form;

  ROUTE_LIST = '/products'

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _productSrv: ProductService,
    private readonly _modalSrv: ModalService,
  ) {
    this.productForm = this._fb.group({
      id: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ], this._validateIdProduct.bind(this)],
      name: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)]],
      description: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]],
      logo: ['', Validators.required],
      date_release: ['', [
        Validators.required,
        this._customValidateDate()
      ]],
      date_revision: [{ value: '', disabled: true }, Validators.required]
    })
  }

  ngOnInit(): void {

    if (history.state.product) {
      this.product = history.state.product;
      this.isEditMode = true;

      if (this.product) {
        this.productForm.patchValue({
          id: this.product.id,
          name: this.product.name,
          description: this.product.description,
          logo: this.product.logo,
          date_release: new Date(this.product.date_release).toISOString().split('T')[0],
          date_revision: new Date(this.product.date_revision).toISOString().split('T')[0]
        });
      }
    }
    if (this.isEditMode) {
      this.productForm.get('id')?.disable();
    }

    this.productForm.get('date_release')?.valueChanges.subscribe((date) => {
      const reviewDate = this._calculateReviewDate(date);
      this.productForm.get('date_revision')?.setValue(reviewDate)
    });

    this.productForm.valueChanges.subscribe(() => {
      this.enabledResetBtn()
    })
  }


  // RESET FORM
  resetForm(): void {
    this.productForm.get('date_revision')?.reset();
    this.productForm.reset()
  }

  enabledResetBtn(): boolean {
    return Object.values(this.productForm.controls).some(control => control.value !== null && control.value !== '');
  }

  // VALIDATE ID EXIST
  private _validateIdProduct(control: AbstractControl) {
    if (!control.value) {
      return of(null);
    }

    return this._productSrv.verificationIdExist(control.value)
      .pipe(
        distinctUntilChanged(),
        map(existID => (existID ? { invalidID: true } : null)),
        catchError(() => of(null))
      );
  }

  // VALIDATE CUSTOM VALIDATE
  private _customValidateDate() {
    return (control: any) => {
      const inputReleaseDate = new Date(control.value);
      const dateToday = new Date();
      dateToday.setHours(0, 0, 0, 0);
      return inputReleaseDate >= dateToday ? null : { invalidDate: true };
    }
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]
  }

  private _calculateReviewDate(releaseDate: string): string {

    const reviewDate = new Date(releaseDate);
    reviewDate.setFullYear(reviewDate.getFullYear() + 1);
    return reviewDate.toISOString().split('T')[0];
  }


  // HANDLE ERROR INPUTS
  getErrorMessage(controlName: string): string | null {
    const control = this.productForm.get(controlName);
    if (!control) return null;

    const errorMessages: { [key: string]: string } = {
      required: this.textHtml.errorRequire,
      id: this.textHtml.id.error,
      name: this.textHtml.name.error,
      description: this.textHtml.description.error,
      logo: this.textHtml.errorRequire,
      dataRelease: this.textHtml.dateRelease.error,
    };

    if (control.touched) {
      const errors = control.errors;

      if (controlName === 'id') {
        if (errors) {
          return errorMessages['id'];
        }
      }

      if (errors?.['required']) {
        return errorMessages['required'];
      }

      if (
        errors?.['invalidID'] ||
        errors?.['minlength'] ||
        errors?.['maxlength'] ||
        errors?.['invalidDate']
      ) {
        return errorMessages[controlName];
      }
    }
    return null;
  }


  onSubmit(): void {
    if (!this.productForm.valid) {
      return;
    }
  
    const formValue: Product = {
      ...this.productForm.getRawValue(),
      date_release: this.formatDate(this.productForm.get('date_release')?.value),
      date_revision: this.formatDate(this.productForm.get('date_revision')?.value),
    };
  
    const request$ = this.isEditMode 
      ? this._productSrv.updateProduct(formValue) 
      : this._productSrv.addProduct(formValue);
  
    request$.subscribe({
      next: (response) => {
        const message = this.isEditMode ? TEXT.modal.OKUpdate : TEXT.modal.OKCreate;
        console.log(message, response);
        this._modalSrv.show(message, false);
      },
      error: (err) => {
        const errorMsg = err.error?.message || TEXT.error;
        this._modalSrv.show(errorMsg, false);
        console.error(this.isEditMode ? TEXT.modal.KOUpdate : TEXT.modal.KOCreate , err);
      },
      complete: () => {
        this.productForm.reset();
        this._router.navigate([this.ROUTE_LIST]);
      },
    });
  }
  
  private formatDate(date: any): string {
    return new Date(date).toISOString();
  }
  


}

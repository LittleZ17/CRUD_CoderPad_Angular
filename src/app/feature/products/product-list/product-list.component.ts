import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ModalService } from 'src/app/core/services/modal.service';
import { TEXT } from 'src/app/shared/utils';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  @Input() productsData: Product[] = [];
  @Output() productIdDeleted = new EventEmitter<string>(); 


  textHtml = TEXT.table;
  ROUTE_EDIT = 'products/edit';

  showModalConfirm: boolean = false;
  productIdAction: string = '';
  action: string = ''; 
  modalMsg: string = '';

  constructor(
    private readonly _router: Router,
    private readonly _modalSrv: ModalService,
  ) { }


  handleActionPerProduct(action: string, product: Product) {

    console.log(action)
    console.log(product)

    if (action === 'edit') {
      this._router.navigate([`${this.ROUTE_EDIT}/${product.id}`], {
        state: { product }
      });
      this.resetAction();
    } else if (action === 'delete') {
      this.productIdAction = product.id;
      this.modalMsg = TEXT.modal.OKDelete.replace('{name}', product.name)
      this._modalSrv.show(this.modalMsg, true)
    }
  }

  onConfirmDelete(productId: string): void {
    this.showModalConfirm = false;
    this.productIdDeleted.emit(productId);
    this.resetAction();
  }

  onCancelDelete(): void {
    this.showModalConfirm = false;
    this.resetAction();
  }

  private resetAction(): void {
    this.action = '';
  }

}

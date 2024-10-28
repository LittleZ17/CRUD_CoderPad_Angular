import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { TEXT } from 'src/app/shared/utils';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  @ViewChild('actionSelect') actionSelect!: ElementRef;
  @Input() productsData: Product[] = [];
  @Output() productIdDeleted = new EventEmitter<string>(); 


  textHtml = TEXT.table;
  ROUTE_EDIT = 'products/edit';

  showModalConfirm: boolean = false;
  productIdAction: string = '';
  modalMsg: string = '';

  constructor(
    private readonly _router: Router,
  ) { }


  handleActionPerProduct(product: Product) {
    const action = this.actionSelect.nativeElement.value;

    if (action === 'edit') {
      this._router.navigate([`${this.ROUTE_EDIT}/${product.id}`], {
        state: { product }
      });
    } else if (action === 'delete') {
      this.showModalConfirm = true;
      this.productIdAction = product.id;
      this.modalMsg = TEXT.modal.text.replace('{name}', product.name)
    }
    this.actionSelect.nativeElement.value = '';
  }

  onConfirmDelete(productId: string): void {
    console.log('confirme')
    this.showModalConfirm = false;
    this.productIdDeleted.emit(productId);
    // this._productSrv.deleteProduct(productId).subscribe({
    //   next: () => {
    //     console.log('eliminado', productId)
    //     // this._loadProducts();
    //   }
    // });
  }

  onCancelDelete(): void {
    this.showModalConfirm = false;
  }

}

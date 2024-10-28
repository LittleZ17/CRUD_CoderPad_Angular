import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() showModal: boolean = false;
  @Input() productId?: string;
  @Input() modalMessage: string = '';
  @Output() confirm: EventEmitter<string> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();


  onConfirm(): void {
    console.log('modal')
    if (this.productId !== undefined) {
      console.log(this.productId)
      this.confirm.emit(this.productId);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

}

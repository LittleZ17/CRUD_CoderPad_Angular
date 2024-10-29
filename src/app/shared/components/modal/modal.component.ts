import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  @Input() showModal: boolean = false;
  @Input() productId?: string;
  @Input() modalMessage: string = '';
  @Output() confirm: EventEmitter<string> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  isError: boolean = false; 

  constructor(
    private readonly _modalSrv: ModalService,
  ) { }

  ngOnInit(): void {
    this._modalSrv.showModal$.subscribe((show) => {
      this.showModal = show;
    });

    this._modalSrv.modalMessage$.subscribe((message) => {
      this.modalMessage = message;
    });

    this._modalSrv.isError$.subscribe((isError) => {
      this.isError = isError; 
    });
  }


  onConfirm(): void {
    console.log(this.productId)
    if (this.productId !== undefined) {
      this.confirm.emit(this.productId);
    }
  }

  onCancel(): void {
    this._modalSrv.hide();
  }

}

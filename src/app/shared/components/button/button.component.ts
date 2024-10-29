import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class CustomButtonComponent {
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() textBtn: string = '';
  @Input() isDisabled: boolean = false;

  @Output() btnClick = new EventEmitter<void>;

  onClick(): void{
    this.btnClick.emit()
  }


}

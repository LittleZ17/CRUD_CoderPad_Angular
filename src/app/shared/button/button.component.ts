import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class CustomButtonComponent {
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() textBtn: string = '';

  @Output() btnClick = new EventEmitter<void>;

  onClick(): void{
    console.log('click')
    this.btnClick.emit()
  }


}

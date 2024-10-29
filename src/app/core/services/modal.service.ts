import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalMessageSubject = new BehaviorSubject<string>('');
  private showModalSubject = new BehaviorSubject<boolean>(false);
  private isErrorSubject = new BehaviorSubject<boolean>(false);


  showModal$ = this.showModalSubject.asObservable();
  modalMessage$ = this.modalMessageSubject.asObservable();
  isError$ = this.isErrorSubject.asObservable(); 

  show(message: string, isError: boolean): void {
    this.modalMessageSubject.next(message);
    this.showModalSubject.next(true);
    this.isErrorSubject.next(isError); 
  }

  hide(): void {
    this.showModalSubject.next(false);
  }
}

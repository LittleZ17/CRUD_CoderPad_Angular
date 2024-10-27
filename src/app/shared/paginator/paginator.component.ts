import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number = 1;
  
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageOnChange = new EventEmitter<number>();
  
  numberPerPageOpt: number[] = [5, 10, 20];

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage)
  }

  changePage(page: number) {
    if(page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }

  changeItemsPerPage(event: Event) {
    const selectElementDOM = event?.target as HTMLSelectElement;
    const itemsPerPage = +selectElementDOM.value;

    if(itemsPerPage !== this.itemsPerPage){
      this.itemsPerPage = itemsPerPage;
      this.itemsPerPageOnChange.emit(this.itemsPerPage);
      this.currentPage = 1;
    }
  }

}

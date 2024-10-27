import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output() searchChange = new EventEmitter<string>();

  onSearch(termSearch: string): void {
    console.log(termSearch)
   
    this.searchChange.emit(termSearch.trim());
  };

}

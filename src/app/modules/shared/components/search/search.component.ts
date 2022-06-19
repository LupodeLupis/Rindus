import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() filteredValue!: string;
  @Output() filteredValueChange = new EventEmitter<string>();

  constructor() { 

  }

  ngOnInit(): void {
  }

}

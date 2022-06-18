import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() dataSource: MatTableDataSource<any>; // type should be generic if table is feed with different type
  @Input() columns: string[];

  constructor() {
    this.columns = [];
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {
    
  }

}

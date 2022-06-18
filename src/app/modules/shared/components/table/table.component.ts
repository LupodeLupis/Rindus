import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit , OnChanges  {

  @Input() tableDataSource!: MatTableDataSource<any>; // type should be generic if table is feed with different type of data
  @Input() columns!: string[];

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private sharingDataService: SharingDataService,
  ) {}

  
  ngOnInit(): void {

  }

  ngOnChanges(simpleChange: SimpleChanges) {
    if (this.tableDataSource) {
      this.tableDataSource.sort = this.matSort;
      this.tableDataSource.paginator = this.matPaginator;
    }
  }

  setPostId(id: string) {
    this.sharingDataService.setPostId(id);
  }

}

import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharingDataService } from '../../services/data-mng/sharing-data.service';

/**
 * This component is created with the intention of reusing a table created with Angular Material through the entire application. 
 * It uses the concept of data binding with @Input decorators to receive data from parents components, sort heading and, 
 * pagination with 5,10,20 chunck of row to be displayed. The idea is to use a generic type, in this case any , in order to handle
 * multiple data type.
 */

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

    @Input() tableDataSource!: MatTableDataSource<any>;
    @Input() columns!: string[];
    @Input() filteredValue!: string;

    @ViewChild(MatPaginator) matPaginator!: MatPaginator;
    @ViewChild(MatSort) matSort!: MatSort;

    constructor(
        private sharingDataService: SharingDataService,
    ) { }


    ngOnInit(): void {        
    }

    // Once the value is set on tableDataSource @Inputs decorator set header sorting , pagination and, filter
    ngOnChanges(simpleChange: SimpleChanges) {

        const filter = simpleChange['filteredValue'];
        const tableData = simpleChange['tableDataSource'];
        if (filter && filter.currentValue) {
            this.tableDataSource.filter = filter.currentValue.toLowerCase();
        } else if (tableData && tableData.currentValue) {
            this.tableDataSource.sort = this.matSort;
            this.tableDataSource.paginator = this.matPaginator;
        };
    }

    // Send a value ( post id ) to the parent component and open the dialog to show list of comments
    setPostId(id: number) { this.sharingDataService.setPostId(id);  }

}

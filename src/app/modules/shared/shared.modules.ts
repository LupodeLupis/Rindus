import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";


import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { SearchInputFieldComponent } from "./components/search-input-field/search-input-field.component";
import { TableComponent } from "./components/table/table.component";


@NgModule({
    declarations: [
        SearchInputFieldComponent,
        TableComponent,
    ],
    imports: [
        CommonModule,
        MatSortModule,
        MatTableModule,
        MatDialogModule,
        MatPaginatorModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        MatSortModule,
        MatTableModule,
        TableComponent,
        MatDialogModule,
        MatPaginatorModule,
        SearchInputFieldComponent,
    ],      
    providers: [

    ],
})  
export class SharedModule { }
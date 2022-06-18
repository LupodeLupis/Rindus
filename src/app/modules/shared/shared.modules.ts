import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { TableComponent } from "./components/table/table.component";
import { SearchComponent } from "./components/search/search.component";
import { ButtonsComponent } from "./components/buttons/buttons.component";

/**
 * This file is intended to collect the majority of the modules which can be used through the App and keep the App module as cleaner as possible. 
 * It includes sharable components ( TableComponent ), third parties (Angular Material ) modules and Angualr modules ( Common )
 */

@NgModule({
    declarations: [
        
        TableComponent,
        SearchComponent,
        ButtonsComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,

        MatSortModule,
        MatTableModule,
        MatDialogModule,
        HttpClientModule,
        MatPaginatorModule,
    ],
    exports: [
        CommonModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        TableComponent,
        SearchComponent,
        MatDialogModule,
        ButtonsComponent,
        HttpClientModule,
        MatPaginatorModule,
    ],      
    providers: [

    ],
})  
export class SharedModule { }
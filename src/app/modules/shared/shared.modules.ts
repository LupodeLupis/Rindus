import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";


import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SearchInputFieldComponent } from "./components/search-input-field/search-input-field.component";
import { TableComponent } from "./components/table/table.component";


@NgModule({
    declarations: [
        SearchInputFieldComponent,
        TableComponent,

    ],
    imports: [
        CommonModule,
        MatTableModule,
        HttpClientModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
    ],
    exports: [
        CommonModule,
        MatTableModule,
        TableComponent,
        HttpClientModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        SearchInputFieldComponent,
    ],
    providers: [

    ],
})
export class SharedModule { }
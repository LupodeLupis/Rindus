/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  errorMessage: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    public snackBarRef: MatSnackBarRef<ErrorsComponent>
  ) { 
    this.errorMessage = this.data
  }

  ngOnInit(): void {
  }

}

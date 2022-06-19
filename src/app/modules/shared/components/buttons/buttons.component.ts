/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { GenericButton } from '../../models/buttons';

@Component({
    selector: 'app-buttons',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

    @Input() config!: GenericButton;

    constructor() {
    }

    ngOnInit(): void {
    }



}

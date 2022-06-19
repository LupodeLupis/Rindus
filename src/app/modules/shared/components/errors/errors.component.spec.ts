import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SharedModule } from '../../shared.modules';

import { ErrorsComponent } from './errors.component';

describe('ErrorsComponent', () => {
  let component: ErrorsComponent;
  let fixture: ComponentFixture<ErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsComponent ],
      imports: [
        SharedModule
      ],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: 'Error message' },
        { provide: MatSnackBarRef, useValue: {} }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorsComponent } from '../../components/errors/errors.component';
import { GenericButton } from '../../models/buttons';
import { SharedModule } from '../../shared.modules';
import { CommonService } from './common.service';


describe('CommonService', () => {
  let commonService: CommonService;
  let snackBarSerice: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: []
    });
    commonService = TestBed.inject(CommonService);
    snackBarSerice = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(commonService).toBeTruthy();
  });

  it('should initialize Close cofig button', () => {
    const expectConfig: GenericButton = {
      action: 'close',
      text: 'Testing text',
      icon: 'close',
    };
    const config = commonService.initializeCloseConfigButton('Testing text');
    expect(expectConfig).toEqual(config);
  });

  it('should initialize Cancel cofig button', () => {
    const expectConfig: GenericButton = {
      action: 'cancel',
      text: 'Cancel',
    };
    const config = commonService.initializeCancelConfigButton();
    expect(expectConfig).toEqual(config);
  });

  it('should test to open Errors component to disply error message', () => {
    const spyOnErrorsComponent = spyOn(snackBarSerice, 'openFromComponent');
    commonService.displayErrorMessage('Error message', 404);
    expect(spyOnErrorsComponent).toHaveBeenCalledWith(ErrorsComponent, {
      data : 'Error message [ status: 404 ]'
    })
  });
});

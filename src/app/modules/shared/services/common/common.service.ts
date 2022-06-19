import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorsComponent } from '../../components/errors/errors.component';
import { GenericButton } from '../../models/buttons';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private snackBarService: MatSnackBar
  ) { }

  initializeCancelConfigButton(): GenericButton {
    return { action: 'cancel', text: 'Cancel' };
  }

  initializeCloseConfigButton(text: string): GenericButton {
    return {
      action: 'close',
      text,
      icon: 'close'
    };
  }

  displayErrorMessage(errorMessage: string, status?: number) {
    this.snackBarService.openFromComponent(ErrorsComponent, {
      data: `${errorMessage} [ status: ${status} ]`
    });
  }
}

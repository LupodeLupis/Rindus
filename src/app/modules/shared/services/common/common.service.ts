import { Injectable } from '@angular/core';
import { GenericButton } from '../../models/buttons';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor() { }

    initializeCancelConfigButton(): GenericButton {
        return { action: 'cancel', text: 'Cancel'  };
    }

    initializeCloseConfigButton(text: string): GenericButton {
        return {
            action: 'close',
            text,
            icon: 'close'
        };
    }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.modules';
import { ErrorsComponent } from './modules/shared/components/errors/errors.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorsComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule, // here we import the Shared module
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {MatListTouchModule} from 'src/app/module/mat-list-touch/mat-list-touch.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListTouchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

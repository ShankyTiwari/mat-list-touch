import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListTouchModule} from '../../projects/mat-list-touch/src/lib/mat-list-touch.module';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatListTouchModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

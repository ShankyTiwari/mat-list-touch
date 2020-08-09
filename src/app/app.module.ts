import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MatListTouchModule} from 'src/app/module/mat-list-touch/mat-list-touch.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {GestureConfig} from 'src/app/module/mat-list-touch/config/gesture-config';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatListTouchModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    FlexLayoutModule
  ],
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

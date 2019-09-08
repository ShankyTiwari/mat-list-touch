import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {MatListTouchComponent} from './mat-list-touch.component';
import {GestureConfig} from './config/gesture-config';
import {MatIconModule, MatListModule, MatRippleModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
  ],
  declarations: [MatListTouchComponent],
  exports: [
    MatListTouchComponent,
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: GestureConfig,
  }]
})
export class MatListTouchModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HAMMER_GESTURE_CONFIG, HammerModule} from '@angular/platform-browser';
import {MaterialImportModule} from './material-import.module';
import {MatListTouchComponent} from './mat-list-touch.component';
import {GestureConfig} from './config/gesture-config';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportModule,
    FlexLayoutModule,
    HammerModule
  ],
  declarations: [MatListTouchComponent],
  exports: [
    MatListTouchComponent
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: GestureConfig,
  }]
})
export class MatListTouchModule {
}

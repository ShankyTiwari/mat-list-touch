import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MaterialsModule } from './materials.module';
import { NgSwipeToDeleteComponent } from './ng-swipe-to-delete.component';
import { GestureConfig } from './config/gesture-config';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule
  ],
  declarations: [NgSwipeToDeleteComponent],
  exports: [
    NgSwipeToDeleteComponent
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: GestureConfig,
  }]
})
export class NgSwipeToDeleteModule { }

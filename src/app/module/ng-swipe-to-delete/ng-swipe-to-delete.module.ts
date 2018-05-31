import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from './materials.module';
import { NgSwipeToDeleteComponent } from './ng-swipe-to-delete.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule
  ],
  declarations: [NgSwipeToDeleteComponent],
  exports: [
    NgSwipeToDeleteComponent
  ]
})
export class NgSwipeToDeleteModule { }

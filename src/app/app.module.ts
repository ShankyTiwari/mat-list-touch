import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgSwipeToDeleteModule } from './module/ng-swipe-to-delete/ng-swipe-to-delete.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgSwipeToDeleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

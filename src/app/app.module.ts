import {AppComponent} from './app.component';
import {NgMatListSwipeModule} from './module/ng-mat-list-swipe/ng-mat-list-swipe.module';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgMatListSwipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

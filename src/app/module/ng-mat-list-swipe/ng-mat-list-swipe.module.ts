import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NgMatImportModule} from './ng-mat-import.module';
import {NgMatListSwipeComponent} from './ng-mat-list-swipe.component';
import {GestureConfig} from './config/gesture-config';

@NgModule({
    imports: [
        CommonModule,
        NgMatImportModule
    ],
    declarations: [NgMatListSwipeComponent],
    exports: [
        NgMatListSwipeComponent
    ],
    providers: [{
        provide: HAMMER_GESTURE_CONFIG,
        useClass: GestureConfig,
    }]
})
export class NgMatListSwipeModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {MaterialImportModule} from 'src/app/module/mat-list-touch/material-import.module';
import {MatListTouchComponent} from 'src/app/module/mat-list-touch/mat-list-touch.component';
import {GestureConfig} from 'src/app/module/mat-list-touch/config/gesture-config';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MaterialImportModule,
        FlexLayoutModule,
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

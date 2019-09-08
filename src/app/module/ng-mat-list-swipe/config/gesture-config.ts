import {HammerGestureConfig} from '@angular/platform-browser';
import { Injectable } from "@angular/core";

@Injectable()
export class GestureConfig extends HammerGestureConfig {
    overrides = {
        pan: {
            touchAction: 'auto',
            direction: 6
        },
        pinch: {
            enable: false
        },
        rotate: {
            enable: false
        },
        swipe: {
            enable: false
        }
    };
}

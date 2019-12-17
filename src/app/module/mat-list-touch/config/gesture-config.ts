import {HammerGestureConfig} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class GestureConfig extends HammerGestureConfig {
    overrides = {
        pan: {
            enable: true,
            touchAction: 'auto',
            direction: Hammer.DIRECTION_HORIZONTAL
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

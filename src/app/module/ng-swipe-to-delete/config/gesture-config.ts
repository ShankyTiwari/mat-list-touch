import { HammerGestureConfig, } from '@angular/platform-browser';

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

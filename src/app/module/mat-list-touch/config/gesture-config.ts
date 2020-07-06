import {HammerGestureConfig} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { Injectable } from "@angular/core";

@Injectable()
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

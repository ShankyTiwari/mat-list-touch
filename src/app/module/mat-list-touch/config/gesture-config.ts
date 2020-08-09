import {HammerGestureConfig} from '@angular/platform-browser';
import {Injectable} from '@angular/core';
import 'hammerjs';
import { DIRECTION_HORIZONTAL } from 'hammerjs';

@Injectable()
export class GestureConfig extends HammerGestureConfig {
  overrides = {
    pan: {
      enable: true,
      touchAction: 'auto',
      direction: DIRECTION_HORIZONTAL
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

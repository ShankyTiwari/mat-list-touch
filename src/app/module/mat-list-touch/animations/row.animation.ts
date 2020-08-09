import {animate, sequence, style, transition, trigger} from '@angular/animations';

const offset = '50';
export const rowsAnimation =
  trigger('rowsAnimation', [
    transition('void => *', [
      style({
        height: '*',
        opacity: '0',
        transform: 'translateY(' + (-offset).toString() + 'px)',
        'box-shadow': 'none'
      }),
      sequence([
        animate('.2s ease', style({
          height: '*',
          opacity: '.2',
          transform: 'translateX(0)',
          'box-shadow': 'none'
        })),
        animate('.35s ease', style({height: '*', opacity: 1, transform: 'translateX(0)'}))
      ])
    ]),
    transition('* => void', [
      style({height: '*', opacity: '1', transform: 'translateX(0px) translateY(' + (-offset).toString() + 'px)', 'box-shadow': 'none'}),
      sequence([
        animate('.2s ease', style({
          height: '*',
          opacity: 0,
          transform: 'translateX(' + (-offset).toString() + 'px) translateY(' + (-offset).toString() + 'px)'
        }))
      ])
    ]),
  ]);

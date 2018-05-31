import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, state, keyframes, transition, animate, query, stagger } from '@angular/animations';


@Component({
  selector: 'ng-swipe-to-delete',
  templateUrl: './ng-swipe-to-delete.component.html',
  styleUrls: ['./ng-swipe-to-delete.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger(100, [
            animate('0s', style({ opacity: '0' })),
            animate('0.2s', style({ height: '0px', opacity: '0', display: 'none' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('slideLeft', [
      transition('* => *', animate(100, keyframes([
        style({ left: '*', offset: 0 }),
        style({ left: '0', offset: 1 }),
      ])
      ))
    ])
  ]
})

export class NgSwipeToDeleteComponent implements OnInit {
  @Input() items: any;
  @Output() deletedItem = new EventEmitter<any>();
  ngstdIndexNumber = null;
  slideThresold = 7;
  constructor() { }
  ngOnInit() { }
  panend(action, index, elementRefrence) {
    const currentMargin = this.getLeftPosition(elementRefrence);
    if (currentMargin > this.slideThresold || currentMargin < - this.slideThresold) {
      this.removeElement(index);
    } else {
      this.ngstdIndexNumber = index;
    }
  }

  panmove(action, index, elementRefrence) {
    elementRefrence.style.left = action.deltaX + 'px';
  }

  alignComplete(event) {
    event.element.style.left = '0px';
    this.ngstdIndexNumber = null;
  }

  removeElement(index) {
    const deletedItem = this.items[index];
    this.items.splice(index, 1);
    this.deletedItem.emit(deletedItem);
  }

  getLeftPosition(elementRefrence) {
    console.log(elementRefrence.style.left);
    const currentleftPosition = elementRefrence.style.left.slice(0, -2);
    if (currentleftPosition !== null) {
      return (parseInt(
        currentleftPosition, 10
      ) * 100) / window.innerWidth;
    } else {
      return 0;
    }
  }
}

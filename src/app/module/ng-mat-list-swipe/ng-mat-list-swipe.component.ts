import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';
import {Warnings} from './enums/warnings';
import {Constants} from './constants/constants';
import {ListType} from "./enums/list-type";

@Component({
    selector: 'ng-mat-list-swipe',
    templateUrl: './ng-mat-list-swipe.component.html',
    styleUrls: ['./ng-mat-list-swipe.component.scss'],
    animations: [
        trigger('listAnimation', [
            transition('* => *', [
                query(':leave', [
                    stagger(100, [
                        animate('0s', style({opacity: '0'})),
                        animate('0.2s', style({height: '0px', opacity: '0', display: 'none'}))
                    ])
                ], {optional: true})
            ])
        ]),
        trigger('slideRow', [
            transition('* => *', animate(100, keyframes([
                    style({left: '*', offset: 0}),
                    style({left: '0', offset: 1}),
                ])
            ))
        ])
    ]
})
export class NgMatListSwipeComponent implements OnInit {
    @Input() swipeThreshold?: number = Constants.DEFAULT_THRESHOLD;
    @Input() listType?: ListType = ListType.SINGLELINE;
    @Input() leftColor?: string;
    @Input() rightColor?: string;

    @Input() silenceWarnings?: boolean = false;

    @Input() dataSource: any;
    @Output() swipeLeftAction = new EventEmitter<any>();
    @Output() swipeRightAction = new EventEmitter<any>();
    @Output() tapAction = new EventEmitter<any>();

    ngstdIndexNumber: number = null;
    EnumListType = ListType;

    ngOnInit() {
        this.resetSwipeList();
    }

    resetSwipeList(): void {
        this.setThreshold();
    }

    setThreshold(): void {
        if (this.swipeThreshold < Constants.MIN_OFFSET || this.swipeThreshold > Constants.MAX_OFFSET) {
            if (this.swipeThreshold > Constants.MAX_OFFSET) {
                this.logWarnings(Warnings.MAX_OFFSET_EXCEEDED, `${Warnings.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_THRESHOLD}%.`);
            }
            if (this.swipeThreshold < Constants.MIN_OFFSET || this.swipeThreshold === Constants.MIN_OFFSET) {
                this.logWarnings(Warnings.ZERO_SLIDE_THRESHOLD_NOT_ALLOWED, `${Warnings.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_THRESHOLD}%.`);
            }
            this.swipeThreshold = Constants.DEFAULT_THRESHOLD;
        }

    }

    panMoveEvent(action, elementRef): void {
        elementRef.style.left = action.deltaX + 'px';
        // elementRef.offsetLeft > 0 ? this.elementLeftSign = true : this.elementLeftSign = false;
    }

    panEndEvent(action, index, elementRef): void {
        const offset = this.getLeftPosition(elementRef);
        if (offset > this.swipeThreshold || (offset < -this.swipeThreshold)) {
            this.removeElement(index); // TODO make this a invoke/emit action.
        } else {
            this.ngstdIndexNumber = index;
        }
    }

    slideComplete(event): void {
        event.element.style.left = '0px';
        console.log('slide done');
        // event.element.offsetLeft > 0 ? this.elementLeftSign = true : this.elementLeftSign = false;
        this.ngstdIndexNumber = null;
    }

    removeElement(index): void {
        const deletedItem = this.dataSource[index];
        this.dataSource.splice(index, 1);
        this.swipeLeftAction.emit(deletedItem);
    }

    getLeftPosition(elementRef): number {
        const currentleftPosition = elementRef.style.left.slice(0, -2);
        if (currentleftPosition !== null) {
            return (parseInt(
                currentleftPosition, 10
            ) * 100) / window.innerWidth;
        } else {
            return 0;
        }
    }

    logWarnings(warningFor: string, extraMessage: any = null): void {
        if (!this.silenceWarnings) {
            switch (warningFor) {
                case Warnings.SLIDE_THRESHOLD_NOT_FOUND:
                case Warnings.ZERO_SLIDE_THRESHOLD_NOT_ALLOWED:
                case Warnings.MAX_OFFSET_EXCEEDED:
                case Warnings.INVALID_SLIDE_THRESHOLD_NOT_ALLOWED:
                    extraMessage === null ? console.warn(this.getConstValue(warningFor)) : console.warn(this.getConstValue(warningFor), extraMessage);
                    break;
            }
        }
    }

    getConstValue(constantName: string): string {
        return Constants[constantName];
    }
}

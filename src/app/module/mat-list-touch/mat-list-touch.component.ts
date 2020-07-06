import {Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {Constants, Warnings} from './utils/constants';
import {rowsAnimation} from './animations/row.animation';

export interface TouchActionEvent {
    index: number;
    data: any;
}

@Component({
    selector: 'mat-list-touch',
    templateUrl: './mat-list-touch.component.html',
    styleUrls: ['./mat-list-touch.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('slideRow', [
            transition('* => *', animate(100, keyframes([
                    style({left: '*', offset: 0}),
                    style({left: '0', offset: 1}),
                ])
            ))
        ]),
        rowsAnimation,
    ]
})
export class MatListTouchComponent implements OnInit {
    @ContentChild('contentTemplate', {static: true}) contentTemplate: TemplateRef<ElementRef>;
    @ContentChild('separatorTemplate', {static: true}) separatorTemplate: TemplateRef<ElementRef>;
    @ContentChild('identityTemplate', {static: true}) identityTemplate: TemplateRef<ElementRef>;

    @Input() dataSource: any[];
    @Output() swipeLeftAction = new EventEmitter<TouchActionEvent>();
    @Output() swipeRightAction = new EventEmitter<TouchActionEvent>();
    @Output() tapAction = new EventEmitter<TouchActionEvent>();

    @Input() separatorEval?: (index: number, item: any) => boolean;
    @Input() leftBorderEval?: (index: number, value: any) => string;
    @Input() rightBorderEval?: (index: number, value: any) => string;
    @Input() disableActionsEval: (index: number, value: any) => boolean;

    @Input() leftColor?: string = 'green';
    @Input() leftIcon?: string = 'check';
    @Input() rightColor?: string = 'red';
    @Input() rightIcon?: string = 'not_interested';
    @Input() defaultSwipeColor?: string = 'gray';

    @Input() swipeThreshold?: number = Constants.DEFAULT_THRESHOLD;
    @Input() swipeLimit?: number = Constants.DEFAULT_LIMIT;
    @Input() silenceWarnings?: boolean = false;

    currentSwipeColor = this.defaultSwipeColor;
    lastAnimatedIndex: number = null;

    ngOnInit() {
        this.resetSwipeList();
    }

    evalLeftBorder(index: number, item: any) {
        if (this.leftBorderEval) {
            return this.leftBorderEval(index, item);
        }
        return '';
    }

    evalRightBorder(index: number, item: any) {
        if (this.rightBorderEval) {
            return this.rightBorderEval(index, item);
        }
        return '';
    }

    resetSwipeList(): void {
        this.setThreshold();
    }

    setThreshold(): void {
        if (this.swipeThreshold < Constants.MIN_OFFSET || this.swipeThreshold > Constants.MAX_OFFSET) {
            if (this.swipeThreshold > Constants.MAX_OFFSET) {
                this.logWarnings(Warnings.MAX_OFFSET_EXCEEDED,
                    `${Warnings.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_THRESHOLD}%.`);
            }
            if (this.swipeThreshold < Constants.MIN_OFFSET || this.swipeThreshold === Constants.MIN_OFFSET) {
                this.logWarnings(Warnings.ZERO_SLIDE_THRESHOLD_NOT_ALLOWED,
                    `${Warnings.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_THRESHOLD}%.`);
            }
            this.swipeThreshold = Constants.DEFAULT_THRESHOLD;
        }
        if (this.swipeLimit < this.swipeThreshold) {
            this.swipeLimit = 100 - this.swipeThreshold;
            this.logWarnings(Warnings.LIMIT_TOO_LOW);
        }
    }

    panMoveEvent(action, elementRef, index, item): void {
        if (this.disableActionsEval && this.disableActionsEval(index, item)) {
            elementRef.style.left = 0;
            return;
        }
        if (!this.swipeLeftAction.observers.length && !this.swipeRightAction.observers.length) {
            elementRef.style.left = 0;
            return;
        }

        // DEBUG THIS HACK
        if (Math.abs(action.deltaY) > 50) {
            elementRef.style.left = 0;
            return;
        }

        const offset = action.deltaX;
        if (Math.abs(action.deltaX) < this.swipeLimit) {
            elementRef.style.left = action.deltaX + 'px';
        } else {
            if (action.deltaX > 0) {
                elementRef.style.left = this.swipeLimit + 'px';
            } else {
                elementRef.style.left = -this.swipeLimit + 'px';
            }
        }
        if (offset > this.swipeThreshold) {
            this.currentSwipeColor = this.leftColor;
        } else if (offset < -this.swipeThreshold) {
            this.currentSwipeColor = this.rightColor;
        } else {
            this.currentSwipeColor = this.defaultSwipeColor;
        }
    }

    panEndEvent(event, index, elementRef): void {
        if (event.deltaX > this.swipeThreshold) {
            this.emitLeftAction(index);
        } else if (event.deltaX < -this.swipeThreshold) {
            this.emitRightAction(index);
        }
        this.lastAnimatedIndex = index;
    }

    tapEvent(index) {
        const tapItem = this.dataSource[index];
        if (this.tapAction.observers) {
            this.tapAction.emit({
                index,
                data: tapItem
            });
        }
    }

    slideComplete(event): void {
        event.element.style.left = '0px';
        this.lastAnimatedIndex = null;
    }

    emitLeftAction(index) {
        const actionItem = this.dataSource[index];
        if (this.swipeLeftAction.observers) {
            this.swipeLeftAction.emit({
                index,
                data: actionItem
            });
        }
    }

    emitRightAction(index) {
        const actionItem = this.dataSource[index];
        if (this.swipeRightAction.observers) {
            this.swipeRightAction.emit({
                index,
                data: actionItem
            });
        }
    }

    logWarnings(warningFor: string, extraMessage?: string): void {
        if (!this.silenceWarnings) {
            switch (warningFor) {
                case Warnings.SLIDE_THRESHOLD_NOT_FOUND:
                case Warnings.ZERO_SLIDE_THRESHOLD_NOT_ALLOWED:
                case Warnings.MAX_OFFSET_EXCEEDED:
                case Warnings.INVALID_SLIDE_THRESHOLD_NOT_ALLOWED:
                    extraMessage ?
                        console.warn(this.getConstValue(warningFor)) :
                        console.warn(this.getConstValue(warningFor), extraMessage);
                    break;
            }
        }
    }

    getConstValue(constantName: string): string {
        return Warnings[constantName];
    }
}

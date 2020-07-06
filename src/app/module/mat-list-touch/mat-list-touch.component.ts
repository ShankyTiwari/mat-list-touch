import {Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {Constants, Warnings} from 'src/app/module/mat-list-touch/utils/constants';
import {rowsAnimation} from 'src/app/module/mat-list-touch/animations/row.animation';

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

    @Input() swipeThreshold?: number = Constants.DEFAULT_THRESHOLD;
    @Input() swipeLimit?: number = Constants.DEFAULT_LIMIT;
    @Input() multiLine?: boolean = true;
    @Input() icon?: boolean = false;
    @Input() avatar?: boolean = false;
    @Input() separatorEval?: (index: number, item: any) => boolean;
    @Input() leftColor?: string = 'green';
    @Input() leftIcon?: string = 'check';
    @Input() leftBorderEval?: (value: any) => string;
    @Input() rightColor?: string = 'red';
    @Input() rightIcon?: string = 'not_interested';
    @Input() rightBorderEval?: (value: any) => string;
    @Input() defaultSwipeColor?: string = 'gray';
    @Input() disableActionsEval: (value: any) => boolean;
    currentSwipeColor = this.defaultSwipeColor;

    @Input() silenceWarnings?: boolean = false;

    @Input() dataSource: any[];
    @Output() swipeLeftAction = new EventEmitter<any>();
    @Output() swipeRightAction = new EventEmitter<any>();
    @Output() tapAction = new EventEmitter<any>();

    lastAnimatedIndex: number = null;

    ngOnInit() {
        this.resetSwipeList();
    }

    evalLeftBorder(item) {
        if (this.leftBorderEval) {
            return this.leftBorderEval(item);
        }
        return '';
    }

    evalRightBorder(item) {
        if (this.rightBorderEval) {
            return this.rightBorderEval(item);
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

    panMoveEvent(action, elementRef, item): void {
        if (this.disableActionsEval && this.disableActionsEval(item)) {
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
            this.tapAction.emit(tapItem);
        }
    }

    slideComplete(event): void {
        event.element.style.left = '0px';
        this.lastAnimatedIndex = null;
    }

    emitLeftAction(index) {
        const actionItem = this.dataSource[index];
        if (this.swipeLeftAction.observers) {
            this.swipeLeftAction.emit(actionItem);
        }
    }

    emitRightAction(index) {
        const actionItem = this.dataSource[index];
        if (this.swipeRightAction.observers) {
            this.swipeRightAction.emit(actionItem);
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

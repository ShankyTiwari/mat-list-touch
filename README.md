# mat-list-touch

This is a list module with touch events (swipe/tap) for Angular 10 projects, based on Angular's mat-list and mat-list-item.

See how we use it in production below:

![70910861-e8788700-2010-11ea-924f-a37767b83ea7](https://user-images.githubusercontent.com/6005355/89727658-0c1c9180-da27-11ea-90ac-aa8d9b77b3b7.png)

## Why mat-list-touch?
Found yourself having to recreate swipe interaction on an angular material list component? 
This module makes it quite easy to do so!

This module provides different approaches as every list is different and every list has a different data source. With the help of this module, you can easily integrate any table data source (`MatTableDataSource` for you?) having **Swipe -> Action flow** or **Tap --> Action flow**. This module should work with all kind of screens widths, and is currently actively used in a cross-platform/PWA production setting (iOS/Andoird/Web).

So, in summary, the module can:
- Lock rows (prevent swipe/tap)
- Swipe rows (different color/icon can be set)
- Tap rows
- Provide separators (above the element where the separator evaluation callback return non-falsy)

We understand that the templates required in the component can be a bit confusing concerning styling. I foresee that is not 100% robust, so please provide a clear issue report in that case and we will take a look!

## Demo

Check the mat-list-touch in action, [click here](https://stackblitz.com/github/ShankyTiwari/mat-list-touch-example).

## Installation
You can use either the npm or yarn command-line tool to install packages. Use whichever is appropriate for your project in the examples below.

#### NPM
```  
npm install --save mat-list-touch
```
        
#### YARN
```          
yarn add --save mat-list-touch
```
        
## Usage
Follow below steps to add multi level list in your project

#### 1. Import MatListTouchModule

You need to import the ```MatListTouchModule``` in the module of your app, where you want to use it.

```typescript        
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MatListTouchModule} from 'src/app/module/mat-list-touch/mat-list-touch.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {GestureConfig} from 'src/app/module/mat-list-touch/config/gesture-config';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        MatListTouchModule,
        BrowserAnimationsModule,
        MatDividerModule, // Advised as often handy in mat-list scenario's
        MatIconModule, // Advised as often handy in mat-list scenario's
        MatSnackBarModule, // Optional, but very nice (Sheets/Dialogs are also an alternative)
        FlexLayoutModule
    ],
    providers: [
        // To override any specific touch behaviors
        {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

```  

        
#### 2. Use ```<mat-list-touch>``` in your HTML

In your HTML: Use the ```<mat-list-touch>```, wherever you like in your project.

```html        
<mat-list-touch (swipeLeftAction)="listItemSwipeLeft($event)"
                (swipeRightAction)="listItemSwipeRight($event)"
                // MatTableDatasource approach
                [dataSource]="listData.connect().value"
                // Array approach
                [dataSource]="listData"
                [icon]="true">
</mat-list-touch>
```
        
#### 3. Structure of array to display the list

Structure your data any way you like, although using MatTableDataSource is often really nice (not required!):     
```typescript
listData = new MatTableDataSource<ListItem>(
    [
        {
            separator: true,
            name: 'Iron Man',
            icon: 'pan_tool',
            start: Date.now(),
            end: Date.now(),
            description: `Iron Man is a fictional superhero. He was the first, and will probably be the last.`,
        }
    ]
);
```
        
## API
### Data (input) 
* ``` dataSource (input array) ``` input data used to construct the list (form it to your own wishes)
### Defining your list
* Define parent element `mat-list-touch`
* Define child `identityTemplate` to identify the row (icon, date, avatar)
```angular2html
<ng-template #identityTemplate let-item> 
    <img src="{{item.avatar}}" /> 
</ng-template>
```
* Define child `contentTemplate` to form the content of the row (text, description) according to your own datasource
```angular2html
<ng-template #contentTemplate let-item>
    <mat-icon>{{item.icon}}</mat-icon>
    <p>{{item.description}}</p>
</ng-template>
```
* Define (OPTIONAL) child `separatorTemplate` to separate the row or to group rows at hand from previous rows. Again, form it with your own content and styling.
```angular2html
<ng-template #separatorTemplate let-item>
    <p>Hero collective -- {{item.fancyCollectionTitle}}</p>
</ng-template>
```
### Callbacks (output)
* ``` swipeLeftAction(touchAction: TouchActionEvent) ``` callback when swipe-left threshold has been exceeded (index:number, data: any)
* ``` swipeRightAction(touchAction: TouchActionEvent) ``` callback when swipe-right threshold has been exceeded (index:number, data: any)
* ``` tapAction(touchAction: TouchActionEvent) ``` callback when click or tap has been executed (index:number, data: any)
### Configuration (input)
* ``` swipeThreshold: number = 100 ``` (default 100) amount of pixels of deadzone before swipe is accepted (after mouse/finger has been released)
* ``` swipeLimit: number = 300 ``` (default 300) amount of pixels before when the list item is stopped from sliding further
* ``` defaultSwipeColor: string = 'gray' ``` (default 'gray') default color when threshold not reached
* ``` leftColor: string = 'green' ``` (default 'green') define background color when threshold reached and swiping to the RIGHT (revealing the LEFT)
* ``` rightColor: string = 'red' ``` (default 'red') define background color when threshold reached and swiping to the LEFT (revealing the RIGHT)
* ``` rightIcon: string = 'check' ``` (default 'check') background mat-icon when this side is opened (LEF)
* ``` rightIcon: string = 'not_interested' ``` (default 'not_interested') background mat-icon when this side is opened (RIGHT)
* ``` silenceWarnings: boolean = false ``` (default: false) silence any warnings thrown
  
### Configuration (callback)
* ``` separatorEval(data: any, index: number) ``` will fire to check whether a row will enable the child template `separatorTemplate`
* ``` leftBorderEval(data: any, index: number) ``` will fire to let you evaluate the color of the item's LEFT border, if any.
* ``` rightBorderEval(data: any, index: number) ``` will fire to let you evaluate the color of the item's RIGHT border, if any.
* ``` disableActionsEval(data: any, index: number) ``` similarly lets you lock the row, if you want.
        
## Dependencies
1. [Material Icons](https://material.io/tools/icons/?style=baseline)
2. [Angular Material](https://material.angular.io)
3. [HammerJs](https://hammerjs.github.io/)
4. [Angular FlexLayout](https://github.com/angular/flex-layout)

## Known problems
- HammerJS is known to give a CommonJS bailout warning for Angular 10 when compiling. To suppress this warning add the following to your `angular.json`:
> projects:project-name-here:architect:build:options:allowedCommonJsDependencies: { ..., "hammerjs", ...}

or put differently, add `hammerjs` to `allowedCommonJsDependencies` for the `@angular-devkit/build-angular:browser` builder specification:
```
"allowedCommonJsDependencies": [
    "hammerjs"
],
```

## Contribution

I welcome you to fork and add more features into it. If you have any bugs or a feature request, please create an issue at [github repository](https://github.com/ShankyTiwari/ng-swipe-to-delete/issues).

## License

MIT

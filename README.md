# mat-list-touch

Template-based (Customizable) Material List with touch interaction for Angular Projects.

## Why mat-list-touch?
Found yourself having to recreate swipe interaction on angular material list components? 
This module makes it quite easy to create such a list by importing it and defining the `mat-list-touch` component.
  

This module provides **Four** types of the listviews, so no need to write code for the listview again and again. With the help of this module, you can easily integrate list view having **Swipe to delete feature**. This module should work with all kind of screens width.

## Demo

Try out the demo by cloning the project, installing with `npm install` and run it with `ng serve`.

_Previous demo_
Check the v1.0 Material Swipe to delete list in action, [click here](http://plugins.codershood.info/#/plugins/ngstd-plugin).
(Not alike v2.0)

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

#### 1. Import NgSwipeToDeleteModule

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
* ``` separatorEval(index: number, value: any) ``` will fire to check whether a row will enable the child template `separatorTemplate`
* ``` leftBorderEval(index: number, value: any) ``` will fire to let you evaluate the color of the item's LEFT border, if any.
* ``` rightBorderEval(index: number, value: any) ``` will fire to let you evaluate the color of the item's RIGHT border, if any.
* ``` disableActionsEval(index: number, value: any) ``` similarly lets you lock the row, if you want.
        
## Dependencies
1. [Material Icons](https://material.io/tools/icons/?style=baseline)
2. [Angular Material](https://material.angular.io)
3. [HammerJs](https://hammerjs.github.io/)

## Contribution

I welcome you to fork and add more features into it. If you have any bugs or feature request, please create an issue at [github repository](https://github.com/ShankyTiwari/ng-swipe-to-delete/issues).

## License

MIT

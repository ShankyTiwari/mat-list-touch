# ng-swipe-to-delete

Material Swipe to delete list for Angular Projects.

## Why ng-swipe-to-delete?

This module provides **Four** types of the listviews, so no need to write code for the listview again and again. With the help of this module, you can easily integrate list view having **Swipe to delete feature**. This module should work with all kind of screens width.

## Demo

Check the Material Swipe to delete list in action, [click here](http://plugins.codershood.info/#/plugins/ngstd-plugin).

## Installation
You can use either the npm or yarn command-line tool to install packages. Use whichever is appropriate for your project in the examples below.

#### NPM
```  
npm install --save ng-swipe-to-delete
```
        
#### YARN
```          
yarn add --save ng-swipe-to-delete
```
        
## Usage
Follow below steps to add multi level list in your project

#### 1. Import NgSwipeToDeleteModule

You need to import the ```NgSwipeToDeleteModule``` in the module of your app, where you want to use it.

```typescript        
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Import the module*/
import { NgSwipeToDeleteModule } from 'ng-swipe-to-delete';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgSwipeToDeleteModule // Import here
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```  

        
#### 2. Use ```<ng-swipe-to-delete>``` in your HTML

In your HTML: Use the ```<ng-swipe-to-delete>```, wherever you like in your project.

```html        
<ng-swipe-to-delete
    [items]='outgoingdata' 
    [configuration]='config'
    (deletedItem)='deletedItem($event)'
></ng-swipe-to-delete>
```
        
#### 3. Structure of array to display the list

Make sure, your structure of array should look like array shown below,     
```typescript
  outgoingdata = [
    {
      title: 'Iron Man',
      icon: `pan_tool`,
      img: `/assets/ironman.jpg`,
      description: `Iron Man is a fictional superhero.`,
      data: {
        name: 'Tony Stark',
        abilities: [
          'Flying', 'Shooting', 'billionaire'
        ]
      }
    },
    {
      title: 'Capton America',
      icon: `view_stream`,
      img: `/assets/captainamerica.jpg`,
      description: `Captain America is the alter ego of Steve Rogers.`,
      data: {
        name: 'Steve Rogers',
        abilities: [
          'Strong', 'Very Strong'
        ]
      }
    },
    {
      title: 'Dr Strange',
      icon: `offline_bolt`,
      img: `/assets/drstange.jpg`,
      description: `He is a master of Mystic Art`,
      data: {
        name: 'Steven Strange',
        abilities: [
          'Mystic Art'
        ]
      }
    },
    {
      title: 'Shaktiman',
      icon: `flash_on`,
      img: `/assets/shatiman.jpg`,
      description: `Shaktimaan is an Indian fictional superhero.`,
      data: {
        name: 'Pandit Gangadhar',
        abilities: [
          'Attractive male', 'Healing', 'Will power-based constructs', 'Flying'
        ]
      }
    },
    {
      title: 'The Winter Soldier',
      icon: `trending_up`,
      img: `/assets/wintersoldier.jpg`,
      description: `Barnes grew up as an Army brat. `,
      data: {
        name: 'James Buchanan "Bucky" Barnes',
        abilities: [
          'Hand to hand combat and Martial arts', 'Strong Arm'
        ]
      }
    },
    {
      title: 'The Batman',
      icon: `attach_money`,
      img: `/assets/batman.jpg`,
      description: `Batman does not possess any superpowers.`,
      data: {
        name: 'Bruce wayne',
        abilities: [
          'Rich', 'Strong'
        ]
      }
    },
    {
      title: 'The Superman',
      icon: `send`,
      img: `/assets/superman.jpg`,
      description: `He is from krypton.`,
      data: {
        name: 'Clark Kent',
        abilities: [
          'Attractive male', 'Healing', 'Will power-based constructs', 'Flying'
        ]
      }
    }
  ];
```
        
## API
Using ```configuration```, different listview can be rendered. Although ```configuration``` is optional, but then you will get simple list.
To render Listview with icons or Listview with Avatars use the below options.
* ```slideThreshold: number``` => This is a percentage width. Once you slide more than a specified percentage(```slideThreshold```)  the list item will be removed. Basically, this will determine at what point the list item should be removed. If no value/Inavlid valid is given then it will consider the default value i.e. 12%.
* ```listType: string;``` => What type of list should be rendered. There are four option listed below. If you give any other input apart from below listed values, it will render the simple list view.
    1. singleline
    2. multiline
    3. listwithicon
    4. listwithimage

* ```classname: string;``` => *[optional]* You can give your own custom class name in order to modify the list appearance. 
* ```disableWarnings: boolean;``` => *[optional]* To suppress the warnings in console.
* ```numberOfDeleteIcon: number;``` => *[optional]* It expects only two values either **1** or **2**. It is used to hide the sweep delete icon on the right side of list item.

        
## Dependencies
1. [Material Icons](https://material.io/tools/icons/?style=baseline)
2. [Angular Material](https://material.angular.io)
3. [HammerJs](https://hammerjs.github.io/)

## Contribution

I welcome you to fork and add more features into it. If you have any bugs or feature request, please create an issue at [github repository](https://github.com/ShankyTiwari/ng-swipe-to-delete/issues).

## Leicense

MIT

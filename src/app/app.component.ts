import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

interface ListItem {
    separator: boolean;
    name: string;
    icon: string;
    start: number;
    end: number;
    description: string;
    // This can all be changed to your liking and is just a helper interface
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    // You can completely customize what the data looks like and how it is represented.
    listData = new MatTableDataSource<ListItem>([
        {
            separator: true,
            name: 'Iron Man',
            icon: 'pan_tool',
            start: Date.now(),
            end: Date.now(),
            description: `Iron Man is a fictional superhero. He was the first, and will probably be the last.`,
        },
        {
            separator: false,
            name: 'Captain America',
            icon: 'view_stream',
            start: Date.now(),
            end: Date.now(),
            description: `Captain America is a fictional superhero.Captain America is the alter ego of Steve Rogers,
            a frail young man enhanced to the peak of human perfection by an experimental
            serum to aid the United States government's efforts in World War II.`,
        },
        {
            separator: true,
            name: 'Dr Strange',
            icon: 'offline_bolt',
            start: Date.now(),
            end: Date.now(),
            description: `Doctor Stephen Vincent Strange is a fictional superhero.
            After a car accident severely damages his hands and hinders his ability to perform surgery,
            he searches the globe for a way to repair them and encounters the Ancient One. `,
        }
    ]);
    config = {
        listType: 'listwithimage',
        slideThreshold: 12,
        numberOfDeleteIcon: 2,
        disableWarnings: false,
        classname: 'my-custom-class'
    };

    constructor() {
    }

    listItemSwipeLeft($event: any) {
        console.log('Swiped left: ', $event);
    }

    listItemSwipeRight($event: any) {
        console.log('Swiped right: ', $event);
    }

    public evaluateSeparatorRequired(index: number, data: ListItem[]): boolean {
        return !!data[index].separator;
    }
}

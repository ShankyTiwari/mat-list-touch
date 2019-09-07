import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSwipeToDeleteComponent } from './ng-swipe-to-delete.component';

describe('NgSwipeToDeleteComponent', () => {
  let component: NgSwipeToDeleteComponent;
  let fixture: ComponentFixture<NgSwipeToDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSwipeToDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSwipeToDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

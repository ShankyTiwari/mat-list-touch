import { NgSwipeToDeleteModule } from './ng-swipe-to-delete.module';

describe('NgSwipeToDeleteModule', () => {
  let ngSwipeToDeleteModule: NgSwipeToDeleteModule;

  beforeEach(() => {
    ngSwipeToDeleteModule = new NgSwipeToDeleteModule();
  });

  it('should create an instance', () => {
    expect(ngSwipeToDeleteModule).toBeTruthy();
  });
});

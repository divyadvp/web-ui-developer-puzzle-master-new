import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { SharedTestingModule } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;
  let sampleBook:ReadingListItem;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
    sampleBook = {
      bookId:'4',
      title:'hard',
      authors:['andrew'],
      description:'sample book'
    }
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });

  describe('markBookAsRead$', () => {
    it('should work', (done) => {
      actions = new ReplaySubject();
      actions.next(
        ReadingListActions.markAsFinishedFromReadingList({ item: sampleBook })
      );

      effects.markBookAsRead$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.confirmedmarkAsFinishedFromReadingList({
            item: {
              ...sampleBook,
              finished: true,
              finishedDate: '2023-06-30T08:34:54.489Z',
            },
          })
        );
        done();
      });
      httpMock
        .expectOne('/api/reading-list/4/finished')
        .flush({
          ...sampleBook,
          finished: true,
          finishedDate: '2023-06-30T08:34:54.489Z',
        });
    });
  });
});



import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { markAsFinishedFromReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let book: ReadingListItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    book = {
      bookId: '1234',
      title: 'new',
      authors: ['max'],
      description: 'Sample',
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set book as read', () => {
    const spy = spyOn(component['store'], 'dispatch');  
    component.markBookasRead(book)
    expect(spy).toHaveBeenCalledWith(
      markAsFinishedFromReadingList({
    item: book,
  })
);
  });


});

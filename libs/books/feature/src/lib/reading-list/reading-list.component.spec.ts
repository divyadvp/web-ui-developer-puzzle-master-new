import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';
import { of } from 'rxjs';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let book: ReadingListItem;
  let snackBar: MatSnackBar;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        SharedTestingModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    book = {
      bookId: '124',
      title: 'Sample Java',
      authors: ['Max'],
      description: 'Sample',
    };
  });
  beforeEach(inject(
    [MatSnackBar, OverlayContainer],
    (sb: MatSnackBar, oc: OverlayContainer) => {
      snackBar = sb;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    }
  ));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispacth removeFromReadingList action when removeFromReadingList called  and snackbar must be called', () => {
    const spy = spyOn(component['store'], 'dispatch');
    spyOn(snackBar, 'open').and.returnValue(
      (component.snackRef = {
        onAction: () => {
          return of({});
        },
      })
    );
    component.removeFromReadingList(book);
    expect(spy).toHaveBeenCalledWith(
      removeFromReadingList({
        item: book,
      })
    );
    expect(snackBar.open).toHaveBeenCalled();
  });
});
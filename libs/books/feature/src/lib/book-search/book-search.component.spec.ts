import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';
import { Book } from '@tmo/shared/models';
import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';
import { of } from 'rxjs';
import { addToReadingList } from '@tmo/books/data-access';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let bookDetails: Book;
  let snackBar: MatSnackBar;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bookDetails = {
      id: '123',
      title: 'testing',
      authors: ['min'],
      description: 'sample desc',
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
    expect(component).toBeDefined();
  });

  it('should dispatch addToReadingList on addBookToReadingList call', () => {
    const spy = spyOn(component['store'], 'dispatch');
    spyOn(snackBar, 'open').and.returnValue(
      (component.snackRef = {
        onAction: () => {
          return of({});
        },
      })
    );
    component.addBookToReadingList(bookDetails);
    expect(spy).toHaveBeenCalledWith(
      addToReadingList({
        book: bookDetails,
      })
    );
    expect(snackBar.open).toHaveBeenCalled();
  });
});

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  snackRef: any;

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.snackRef = this.snackBar.open(item.title + ' Removed from Reading List', 'Undo?', {
      duration: 4000,
      horizontalPosition: 'center',
    });
    this.snackRef.onAction().subscribe(() => {
      const bookData = { ...item, bookId: item.id };
      return this.store.dispatch(addToReadingList({ book: bookData }));
    });
  }
}

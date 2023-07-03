import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';
import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, ReactiveFormsModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(()=>{
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should able to call searchBooks when input value given', () => {
    const el = fixture.nativeElement.querySelector('input');
    el.value = 'data';
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.searchBooks).toHaveBeenCalled();
    });
  });

  it('should unsubscribe all the async calls on ngOnDestroy method', () => {
    const unsubscribeSpy = jest.spyOn(
      (component as any).subscription,
      'unsubscribe'
    );
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

});

import {Component, OnInit, OnDestroy} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {BorrowedBooksService} from "../shared/model/borrowed-books.service";
import {BooksService} from "../shared/model/books.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit, OnDestroy {

  borrowed: any;
  allBooks: any;
  books: any;
  borrowedBookSubscriber: Subscription;
  allBookSubscriber: Subscription;
  authSubscriber: Subscription;
  uid: any;
  borrowedKeys: any;

  constructor(private af: AngularFire, private bb: BorrowedBooksService, private bs: BooksService) {
  }

  ngOnInit() {
    this.authSubscriber = this.af.auth.subscribe(
      auth => {
        if (auth != null) {
          this.uid = auth.uid
        }
      });
    this.borrowedBookSubscriber = this.borrowed = this.bb.getBorrowedBooks(this.uid).subscribe(
      result => {
        this.borrowed = result;
      }
    );
    this.allBookSubscriber = this.bs.getAllBooks().subscribe(
      result => {
        this.allBooks = result;
        var allBooksMap = {};
        this.allBooks.forEach(function (element, index, array) {
          allBooksMap[element.isbn] = element;
        });
        var books = [];
        this.borrowed.forEach(function (element, index, array) {
          allBooksMap[element.isbn].borrowedBookKey = element.$key;
          books.push(allBooksMap[element.isbn]);

        });
        this.books = books;
      });
  }

  ngOnDestroy(): void {
    if (this.borrowedBookSubscriber != null)
      this.borrowedBookSubscriber.unsubscribe();
    if (this.allBookSubscriber != null)
      this.allBookSubscriber.unsubscribe();
    if (this.authSubscriber != null)
      this.authSubscriber.unsubscribe();
  }

  expandBook(book) {
    $('div[title="' + book + '"]').slideToggle();
  }

  returnBook(book: any) {
    var isbn = book.isbn;
    var bookKey = book.$key;
    var borrowedBookKey = book.borrowedBookKey;
    var count = book.count;
    this.bb.returnBook(borrowedBookKey);

    console.log('isbn: ' + isbn);

    this.bs.changeCount(bookKey, count + 1);

  }

  hideBook(isbn) {
    $("#" + isbn).hide();
  }
}

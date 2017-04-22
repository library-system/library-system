import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {BooksService} from "../shared/model/books.service";
import {Book} from "../shared/model/Book";
import {Subscription} from "rxjs";
import {AngularFire, AngularFireDatabase, FirebaseApp} from "angularfire2";
import {BorrowedBooksService} from "../shared/model/borrowed-books.service";


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Book[];
  booksServiceSubscriber: Subscription;
  angularFireSubscriber: Subscription;
  firapp: any;

  constructor(@Inject(FirebaseApp) firebaseApp: any, private bs: BooksService, private route: Router, private af: AngularFire,
              private bb: BorrowedBooksService) {
    this.firapp = firebaseApp;
  }

  ngOnInit() {
    this.booksServiceSubscriber = this.bs.getAllBooks().subscribe(
      result => this.books = result
    );
  }

  ngOnDestroy() {
    if (this.booksServiceSubscriber != null)
      this.booksServiceSubscriber.unsubscribe();
    if (this.angularFireSubscriber != null)
      this.angularFireSubscriber.unsubscribe();
  }

  expandBook(book) {
    $('div[title="' + book + '"]').slideToggle();
  }

  borrowBook(isbn, count, key) {
    var uid;
    this.angularFireSubscriber = this.af.auth.subscribe(
      auth => {
        if (auth != null) {
          uid = auth.uid
        }
      });

    if (uid != null) {
      this.af.database.list('borrowedBooks').push({
        uid: uid,
        isbn: isbn,
        externalId: uid + '_' + isbn
      });

      this.bs.changeCount(key, count - 1);
    }

  }

  updateBooks(result) {
    console.log(result);
    var books = result[0].books;
    books.push('test3');
    this.bb.updateOrder(result, books);
  }
}

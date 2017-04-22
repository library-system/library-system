import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";

@Injectable()
export class BorrowedBooksService {

  constructor(private af: AngularFire) { }

  updateOrder(key, books) {
    this.af.database.list('borrowedBooks').update(key, { books: books});
  }

  getBorrowedBooks(uid: string) {
    return this.af.database.list('borrowedBooks',
      {
        query: {
          orderByChild: 'uid',
          equalTo: uid
        }
      }
    );
  }

  returnBook(key) {
    this.af.database.list('/borrowedBooks').remove(key);
  }
}

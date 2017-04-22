import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import {Book} from "./Book";

@Injectable()
export class BooksService {

  constructor(private af:AngularFire) { }

  getBooksById(id:string): Observable<Book>{
    return this.af.database.object('books/'+id).map(Book.parseFromJson);
  }

  getAllBooks(): Observable<Book[]>{
    return this.af.database.list('books').map(Book.parseFromArray);
  }

  changeCount(key, value) {
    this.af.database.list('books').update(key, { count: value});
  }

}

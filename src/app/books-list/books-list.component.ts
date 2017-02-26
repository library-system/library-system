import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BooksService} from "../shared/model/books.service";
import {Book} from "../shared/model/Book";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  books: Book[];

  constructor(private bl: BooksService,  private route: Router) {
    this.bl.getAllBooks().subscribe(
      result => this.books = result
    );
  }

  ngOnInit() {
  }

}

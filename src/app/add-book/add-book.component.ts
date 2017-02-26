import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  form: FormGroup;
  books: FirebaseListObservable<any>;

  constructor(private fb: FormBuilder, private af: AngularFire) {
    this.form = this.fb.group({
      title: ['',Validators.required]
    });
    this.books = this.af.database.list('books');
  }

  ngOnInit() {
  }

  addBook() {
    this.books.push({
      title: this.form.value.title
    });
  }
}

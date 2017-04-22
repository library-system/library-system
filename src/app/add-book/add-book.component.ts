import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFire, FirebaseListObservable, FirebaseApp} from "angularfire2";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  form: FormGroup;
  books: FirebaseListObservable<any>;
  storage: any;
  event: EventTarget;
  imageUrl: string;

  constructor(@Inject(FirebaseApp)  firebaseApp: any, private fb: FormBuilder, private af: AngularFire) {
    this.storage = firebaseApp.storage();
    this.form = this.fb.group({
      title: ['',Validators.required],
      author: ['',Validators.required],
      isbn: ['', Validators.required],
      description: ['', Validators.required],
      count: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.books = this.af.database.list('books');
  }

  addBook() {
    console.log('Title');
    console.log(this.form.value.title);
    let eventObj: MSInputMethodContext = <MSInputMethodContext> this.event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let file: FileList = target.files;
    this.storage.ref().child(this.form.value.isbn).put(file[0]).then(
      result => {
        console.log(this.form.value.title);
        this.books.push({
          title: this.form.value.title,
          author: this.form.value.author,
          isbn: this.form.value.isbn,
          description: this.form.value.description,
          count: this.form.value.count,
          imageUrl: result.downloadURL
        });
        this.form.reset();
      }
    );
  }

  onChange(event: EventTarget) {
    this.event = event;
  }
}

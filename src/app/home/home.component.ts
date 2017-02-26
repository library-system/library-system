import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sample: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {
    this.sample = this.af.database.list('/sample');
  }

  ngOnInit() {
  }

}
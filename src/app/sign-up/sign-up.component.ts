import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";
import {FirebaseListObservable, AngularFire} from "angularfire2";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  profiles: FirebaseListObservable<any>;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router, private af: AngularFire) {
    this.form = this.fb.group({
      email:['',Validators.required],
      password: ['', Validators.required],
      firstName:['',Validators.required],
      secondName:['',Validators.required],
      indexNumber:['',Validators.required]
    });
    this.profiles = af.database.list('profiles');
  }

  ngOnInit() {
  }

  signUp() {
    const val = this.form.value;
    this.authService.signUp(val.email,val.password).
      subscribe(
      () => {
        alert('User created successfully');
        var uid;
        this.af.auth.subscribe(auth => uid = auth.uid);
        this.createProfileRecord(uid);
        this.router.navigateByUrl('/home');
      },
      err => alert (err)
    );
  }

  createProfileRecord(uid: string) {
    this.profiles.push({
      uid: uid,
      email: this.form.value.email,
      firstName: this.form.value.firstName,
      secondName: this.form.value.secondName,
      indexNumber: this.form.value.indexNumber
    });
  }
}

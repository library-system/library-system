import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form:FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) {
    this.form = this.fb.group({
      email:['',Validators.required],
      password: ['', Validators.required],
      firstName:['',Validators.required],
      secondName:['',Validators.required],
      indexNumber:['',Validators.required]
    });
  }

  ngOnInit() {
  }

  signUp() {
    const val = this.form.value;
    this.authService.signUp(val.email,val.password).
      subscribe(
      () => {
        alert('User created successfully');
        this.router.navigateByUrl('/home');
      },
      err => alert (err)
    );
  }

}

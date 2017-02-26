import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthInfo} from "./shared/security/auth-info";
import {AuthService} from "./shared/security/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private choosenMenuElementFlag: number = 1;
  authInfo: AuthInfo;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
  }

  setFlagVariable(choosenMenuElement: number) {
    this.choosenMenuElementFlag = choosenMenuElement;
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

   navigateToSignup() {
    this.router.navigateByUrl('/signup');
  }

  navigateToProfile() {
    this.router.navigateByUrl('/user');
  }

  logout() {
    this.authService.logout();
  }
}

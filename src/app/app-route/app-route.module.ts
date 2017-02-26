import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import {AuthGuard} from "../shared/security/auth.guard";
import {BooksListComponent} from "../books-list/books-list.component";
import {AddBookComponent} from "../add-book/add-book.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'books-list', component: BooksListComponent },
  { path: 'add-book', component: AddBookComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouteModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRouteModule } from './app-route/app-route.module';
import {AngularFireModule, AuthProviders, AuthMethods, FirebaseAuth} from 'angularfire2';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {removeDebugNodeFromIndex} from "@angular/core/src/debug/debug_node";
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthService} from "./shared/security/auth.service";
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AuthGuard} from "./shared/security/auth.guard";
import {AuthBackend} from "angularfire2/auth";
import { BooksListComponent } from './books-list/books-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import {BooksService} from "./shared/model/books.service";
import {ProfilesService} from "./shared/model/profiles.service";


export var config = {
  apiKey: "AIzaSyBF10UrN-ooE2g0QRve8EclzYsYS3XVPLo",
  authDomain: "library-system-48e8e.firebaseapp.com",
  databaseURL: "https://library-system-48e8e.firebaseio.com",
  storageBucket: "library-system-48e8e.appspot.com",
  messagingSenderId: "848674810873"
};

export const authConfig = {
  provder: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent,
    BooksListComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouteModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config, authConfig)

  ],
  providers: [AuthService, AuthGuard, BooksService, ProfilesService],
  bootstrap: [AppComponent]
})
export class AppModule {

}

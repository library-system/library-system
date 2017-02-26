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
import { ExampleDirective } from './example.directive';
import { BooksListComponent } from './books-list/books-list.component';


export var config = {
  apiKey: "AIzaSyAdkEpbA2NtXf4b9XRmrmMF7QbVEzr5C_w",
  authDomain: "library-system-f1efe.firebaseapp.com",
  databaseURL: "https://library-system-f1efe.firebaseio.com",
  storageBucket: "library-system-f1efe.appspot.com",
  messagingSenderId: "113079028388"
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
    ExampleDirective,
    BooksListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouteModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config, authConfig)

  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}

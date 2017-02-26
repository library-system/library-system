import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import {Profile} from "./Profile";

@Injectable()
export class ProfilesService {

  constructor(private af: AngularFire) { }

  getProfileByEmail(uid:string): Observable<Profile> {
    return this.af.database.list('profiles', {
      query: {
        orderByChild: 'uid',
        equalTo: uid
      }
    }).map(Profile.parseFromJson);
  }
}

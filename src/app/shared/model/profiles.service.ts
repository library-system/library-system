import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import {Profile} from "./Profile";

@Injectable()
export class ProfilesService {

  constructor(private af: AngularFire) { }

  getProfileByUid(uid:string): Observable<Profile> {
    return this.af.database.list('profiles', {
      query: {
        orderByChild: 'uid',
        equalTo: uid
      }
    }).first().map(result => Profile.parseFromJson(result[0]));
  }

  updateProfileAvatar(key, url) {
    this.af.database.list('profiles').update(key, { avatarUrl : url});
  }

  updateProfileFirstName(key, firstName) {
    this.af.database.list('profiles').update(key, { firstName: firstName });
  }

  updateProfileSecondName(key, secondName) {
    this.af.database.list('profiles').update(key, { secondName: secondName });
  }

  updateProfileIndexNumber(key, indexNumber) {
    this.af.database.list('profile').update(key, { indexNumber: indexNumber });
  }
}

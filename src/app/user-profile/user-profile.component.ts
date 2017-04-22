import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProfilesService} from "../shared/model/profiles.service";
import {Profile} from "../shared/model/Profile";
import {AngularFire} from "angularfire2";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  profile: Profile;
  subscriber: Subscription;

  constructor(private ps: ProfilesService, private af: AngularFire) {
    var uid;
    this.subscriber = this.af.auth.subscribe(auth => uid = auth.uid);
    this.ps.getProfileByUid(uid).subscribe(
      result => {
        if(result == null) {
          console.log('result null');
        }
        else {
          console.log('result nie jest null');
        }
        this.profile = result;
        console.log(this.profile.email);
      }
    );

    if(this.profile == null) {
      console.log('profil null');
    }
    else {
      console.log('nie null');
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}

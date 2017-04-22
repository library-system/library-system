import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {FirebaseApp, AngularFire} from "angularfire2";
import {Subscription} from "rxjs";
import {ProfilesService} from "../shared/model/profiles.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  storage : any;
  profileSubscriber : Subscription;
  authSubscriber : Subscription;
  profile : any;
  form : FormGroup;
  event : EventTarget;

  constructor(@Inject(FirebaseApp) firebaseApp: any, private ps : ProfilesService, private af : AngularFire, private fb: FormBuilder) {
    this.storage = firebaseApp.storage();
  }

  ngOnInit() {
    this.form = this.fb.group({
      name : ['',Validators.required],
      secondName : ['',Validators.required],
      indexNumber: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    if(this.profileSubscriber != null) {
      this.profileSubscriber.unsubscribe();
    }
    if(this.authSubscriber != null) {
      this.authSubscriber.unsubscribe();
    }
  }

  updateProfile() {
    var uid;
    let file : FileList;
    if(this.event != null) {
      let eventObj: MSInputMethodContext = <MSInputMethodContext> this.event;
      let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
      file = target.files;
    }
    this.authSubscriber = this.af.auth.subscribe(auth => uid = auth.uid);
    this.profileSubscriber = this.ps.getProfileByUid(uid).subscribe(
      result => {
        this.profile = result;
      //  if(this.profile.avatarUrl != '' && file != null) {
        //  this.storage.ref().child(uid).remove();
       // }
        this.updateProfileValues();
      }
    );
    if(file != null) {
      this.storage.ref().child(uid).put(file[0]).then(
        result => {
          this.ps.updateProfileAvatar(this.profile.$key, result.downloadURL);
        }
      );
    }
  }

  updateProfileValues() {
    if(this.form.value.name != '') {
      this.ps.updateProfileFirstName(this.profile.$key, this.form.value.name);
    }
    if(this.form.value.secondName != '') {
      this.ps.updateProfileSecondName(this.profile.$key, this.form.value.secondName);
    }
    if(this.form.value.indexNumber != '') {
      this.ps.updateProfileIndexNumber(this.profile.$key, this.form.value.indexNumber);
    }
  }

  onChange(event: EventTarget) {
    this.event = event;
  }
}

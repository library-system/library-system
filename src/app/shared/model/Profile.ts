export class Profile {
  constructor(public $key:string, public uid:string, public email:string, public firstName:string, public secondName: string,
              public indexNumber: string, public avatarUrl : string){
  }

  static parseFromArray(array): Profile[] {
    return array.map(Profile.parseFromJson);
  }

  static parseFromJson({$key, uid, email, firstName, secondName, indexNumber, avatarUrl}):Profile {
    return new Profile($key, uid, email, firstName, secondName, indexNumber, avatarUrl);
  }
}

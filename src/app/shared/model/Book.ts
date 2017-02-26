export class Book {
  constructor(public $key:string, public title:string, public description:string){
  }

  static parseFromArray(array): Book[] {
    return array.map(Book.parseFromJson);
  }

  static parseFromJson({$key, title, description}):Book {
    return new Book($key, title, description);
  }
}

export class Book {
  constructor(public $key:string, public title:string, public description:string, public count: number, public author: string,
              public isbn: string, public imageUrl: string)
  {
  }

  static parseFromArray(array): Book[] {
    return array.map(Book.parseFromJson);
  }

  static parseFromJson({$key, title, description, count, author, isbn, imageUrl}):Book {
    return new Book($key, title, description, count, author, isbn, imageUrl);
  }
}

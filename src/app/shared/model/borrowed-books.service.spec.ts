/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BorrowedBooksService } from './borrowed-books.service';

describe('BorrowedBooksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BorrowedBooksService]
    });
  });

  it('should ...', inject([BorrowedBooksService], (service: BorrowedBooksService) => {
    expect(service).toBeTruthy();
  }));
});

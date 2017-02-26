import { LibrarySystemPage } from './app.po';

describe('library-system App', function() {
  let page: LibrarySystemPage;

  beforeEach(() => {
    page = new LibrarySystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

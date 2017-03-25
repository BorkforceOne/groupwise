import { GroupwisePage } from './app.po';

describe('groupwise App', function() {
  let page: GroupwisePage;

  beforeEach(() => {
    page = new GroupwisePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

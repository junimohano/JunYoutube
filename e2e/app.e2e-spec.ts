import { JunYoutubePage } from './app.po';

describe('jun-youtube App', () => {
  let page: JunYoutubePage;

  beforeEach(() => {
    page = new JunYoutubePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

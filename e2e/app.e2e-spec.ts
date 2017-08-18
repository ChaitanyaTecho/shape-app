import { ShapeAreaPage } from './app.po';

describe('shape-area App', () => {
  let page: ShapeAreaPage;

  beforeEach(() => {
    page = new ShapeAreaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to sa!!');
  });
});

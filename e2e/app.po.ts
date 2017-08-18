import { browser, by, element } from 'protractor';

export class ShapeAreaPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sa-root h1')).getText();
  }
}

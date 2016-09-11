import { CpAnalyzerPage } from './app.po';

describe('cp-analyzer App', function() {
  let page: CpAnalyzerPage;

  beforeEach(() => {
    page = new CpAnalyzerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

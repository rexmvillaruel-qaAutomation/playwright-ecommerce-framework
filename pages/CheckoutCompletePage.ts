import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly title: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;
  readonly generatePdfButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByTestId('title');
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.backHomeButton = page.getByTestId('back-to-products');
    this.generatePdfButton = page.getByTestId('generate-pdf-order');
  }

  // Action: Return to the inventory page
  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  // Action: Generate the order PDF
  async generatePdf(): Promise<void> {
    await this.generatePdfButton.click();
  }
}
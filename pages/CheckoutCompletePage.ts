import { expect, Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;

  readonly title: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;
  readonly generatePdfButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.locator('[data-test="title"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.generatePdfButton = page.locator('[data-test="generate-pdf-order"]');
  }

  async verifyLoaded(expectedTitle: string) 
    {
        await expect(this.title).toHaveText(expectedTitle);
    }
  async verifyMessages(
    expectedHeader: string,
    expectedText: string,
    )
    {
        await expect(this.completeHeader).toHaveText(expectedHeader);
        await expect(this.completeText).toHaveText(expectedText);
    }
  async verifyActionButtons() 
    {
        await expect(this.backHomeButton).toBeVisible();
        await expect(this.generatePdfButton).toBeVisible();
    }
  async clickBackHome() {
        await this.backHomeButton.click();
    }
  async generatePdf() {
        await this.generatePdfButton.click();
    }
}
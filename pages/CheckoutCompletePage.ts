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
    
    // Locate the checkout completion page using its visible title.
    this.title = page.getByText('Checkout: Complete!', {
      exact: true,
    });

    // Locate the confirmation heading using its accessible role and name.
    this.completeHeader = page.getByRole('heading', {
      name: 'Thank you for your order!',
      exact: true,
    });

    // Retain the test ID for precise confirmation message validation.
    this.completeText = page.getByTestId('complete-text');

    // Locate the Back Home button using its accessible role and name.
    this.backHomeButton = page.getByRole('button', {
      name: 'Back Home',
      exact: true,
    });

    // Locate the PDF generation button using its actual accessible name.
    this.generatePdfButton = page.getByRole('button', {
      name: 'Generate PDF order',
      exact: true,
    });
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
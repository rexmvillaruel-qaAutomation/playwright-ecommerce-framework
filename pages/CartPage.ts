
import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItem: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {

    this.page = page;
    this.cartItem = page.getByTestId('inventory-item');
    
    // Locate the Checkout button using its accessible role and name.
    this.checkoutButton = page.getByRole('button', {
      name: 'Checkout',
      exact: true,
    });
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
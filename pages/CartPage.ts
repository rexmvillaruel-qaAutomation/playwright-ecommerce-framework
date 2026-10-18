
import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItem: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItem = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
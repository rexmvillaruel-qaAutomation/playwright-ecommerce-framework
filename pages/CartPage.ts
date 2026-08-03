import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItem: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItem = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async verifyCartItemVisible() {
    await expect(this.cartItem).toBeVisible();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
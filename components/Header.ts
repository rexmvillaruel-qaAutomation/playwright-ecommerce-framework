import { Locator, Page } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}
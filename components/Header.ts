
import { Locator, Page } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locate the shopping cart using its accessible role and name.
    // Allow the accessible name to change based on the cart contents.
    this.shoppingCartLink = page.getByRole('button', {
      name: /^Cart(?:,|$)/i,
    });
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
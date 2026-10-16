
import { Locator, Page } from '@playwright/test';
import { ProductDetails } from '../types/product';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inventoryContainer = page.getByTestId('inventory-container');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async addProductToCart(productDetails: ProductDetails) {
    await this.page
      .getByTestId(`add-to-cart-${productDetails.locatorId}`)
      .click();
  }
}

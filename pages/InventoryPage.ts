import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly shoppingCartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async verifyLoaded() 
    {
        await expect(this.inventoryContainer).toBeVisible();
    
    }

 async addProductToCart(productDetails: any) {
    await this.page
        .locator(`[data-test="add-to-cart-${productDetails.locatorId}"]`)
        .click();
}
  async verifyCartBadge(expectedCount: string) 
    {
        await expect(this.cartBadge).toHaveText(expectedCount);
    }

  async openCart() {
    await this.shoppingCartLink.click();
    
  }
}
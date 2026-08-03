import { expect, Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {

 
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productName: Locator;
  readonly productQuantity: Locator;
  readonly productPrice: Locator;
  readonly checkoutButton: Locator;


  constructor(page: Page) {

    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productQuantity = page.locator('[data-test="item-quantity"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.checkoutButton = page.locator('[data-test="finish"]');
  }

  async verifyPageLoaded()
    {
        await expect(this.pageTitle).toBeVisible();
    
    }
  async verifyProductName(expectedName: string) 
    {
        await expect(this.productName).toHaveText(expectedName);
    }
  async verifyQuantity(expectedCount: string) 
    {
        await expect(this.productQuantity).toHaveText(expectedCount);
    }
  async verifyPrice(expectedPrice: string) 
    {
        await expect(this.productPrice).toHaveText(expectedPrice);
    }


  async finishCheckout() {
    await this.checkoutButton.click();
    
  }
}
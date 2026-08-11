import { expect, Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {

 
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productName: Locator;
  readonly productQuantity: Locator;
  readonly productPrice: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  readonly finishButton: Locator;


  constructor(page: Page) {

    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productQuantity = page.locator('[data-test="item-quantity"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.paymentInfo =  page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.itemTotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[id="finish"]');
  }

  async verifyPageLoaded(expectedTitle: string)
    {
        await expect(this.pageTitle).toHaveText(expectedTitle);
    
    }
    async verifyProductDetails(
        expectedName: string,
        expectedCount: string,
        expectedPrice: string,
        
    ) 
    {
        await expect(this.productName).toHaveText(expectedName);
        await expect(this.productQuantity).toHaveText(expectedCount);
        await expect(this.productPrice).toHaveText(expectedPrice);
    }

    async verifyOrderSummary(
        expectedPaymentInfo: string,
        expectedShippingInfo: string,
        expectedItemTotal: string,
        expectedTax: string,
        expectedTotal: string
    ) 
   {
        await expect(this.paymentInfo).toHaveText(expectedPaymentInfo);
        await expect(this.shippingInfo).toHaveText(expectedShippingInfo);
        await expect(this.itemTotal).toContainText(expectedItemTotal);
        await expect(this.tax).toContainText(expectedTax);
        await expect(this.total).toContainText(expectedTotal);

    }

  async completeCheckout() {
    await this.finishButton.click();
    
  }
}
import { Locator, Page } from '@playwright/test';

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

    this.pageTitle = page.getByTestId('title');
    this.productName = page.getByTestId('inventory-item-name');
    this.productQuantity = page.getByTestId('item-quantity');
    this.productPrice = page.getByTestId('inventory-item-price');
    this.paymentInfo = page.getByTestId('payment-info-value');
    this.shippingInfo = page.getByTestId('shipping-info-value');
    this.itemTotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.locator('#finish');
  }

  // Action: Finish the checkout process
  async completeCheckout(): Promise<void> {
    await this.finishButton.click();
  }
}
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

    // Locate the checkout overview using its visible page title.
    this.pageTitle = page.getByText('Checkout: Overview', {
      exact: true,
    });

    // Retain test IDs for dynamic product and summary values.
    this.productName = page.getByTestId('inventory-item-name');
    this.productQuantity = page.getByTestId('item-quantity');
    this.productPrice = page.getByTestId('inventory-item-price');
    this.paymentInfo = page.getByTestId('payment-info-value');
    this.shippingInfo = page.getByTestId('shipping-info-value');

    // Locate price summary values using visible text labels.
    this.itemTotal = page.getByText(/^Item total:/);
    this.tax = page.getByText(/^Tax:/);
    this.total = page.getByText(/^Total:/);
    
    // Locate the Finish button using its accessible role and name.
    this.finishButton = page.getByRole('button', {
      name: 'Finish',
      exact: true,
    });
  }

  // Action: Finish the checkout process
  async completeCheckout(): Promise<void> {
    await this.finishButton.click();
  }
}
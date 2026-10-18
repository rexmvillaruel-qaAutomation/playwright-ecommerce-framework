
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export class CheckoutHelper {
  readonly cartPage: CartPage;
  readonly checkoutPage: CheckoutPage;

  constructor(cartPage: CartPage, checkoutPage: CheckoutPage) {
    this.cartPage = cartPage;
    this.checkoutPage = checkoutPage;
  }

  // Workflow: Proceed from the cart through checkout information
  async proceedToCheckout(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    // Open checkout from the cart
    await this.cartPage.clickCheckout();

    // Enter customer information
    await this.checkoutPage.fillCheckoutInformation(
      firstName,
      lastName,
      postalCode
    );

    // Continue to checkout overview
    await this.checkoutPage.continueCheckout();
  }
}

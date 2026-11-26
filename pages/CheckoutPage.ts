
import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {

    this.page = page;
    
    // Locate checkout fields using visible placeholders.
    this.firstNameInput = page.getByPlaceholder('First Name', {
      exact: true,
    });

    this.lastNameInput = page.getByPlaceholder('Last Name', {
      exact: true,
    });

    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code', {
      exact: true,
    });

    // Locate the Continue button using its accessible role and name.
    this.continueButton = page.getByRole('button', {
      name: 'Continue',
      exact: true,
    });
  }

  // Action: Fill in the required checkout information
  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  // Action: Continue to checkout overview
  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
  }
}
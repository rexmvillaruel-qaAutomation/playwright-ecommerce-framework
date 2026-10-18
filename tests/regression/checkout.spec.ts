import { expect, test } from '../../fixtures/baseFixture';
import messages from '../../data/messages.json';
import users from '../../data/users.json';
import products from '../../data/products.json';

test(
  'Complete checkout information and continue',
  async ({
    loginPage,
    inventoryPage,
    header,
    cartPage,
    checkoutPage,
    checkoutOverviewPage,
  }) => {
    // Arrange: Log in as a standard user
    await loginPage.goto();
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    // Act: Add the backpack to the cart
    await inventoryPage.addProductToCart(products.backpack);

    // Act: Open the cart
    await header.openCart();

    // Assert: Verify the cart contains exactly one visible item
    await expect(cartPage.cartItem).toHaveCount(1);
    await expect(cartPage.cartItem.first()).toBeVisible();

    // Act: Open checkout from the cart
    await cartPage.clickCheckout();

    // Act: Enter customer information
    await checkoutPage.fillCheckoutInformation(
      users.standardUser.firstName,
      users.standardUser.lastName,
      users.standardUser.postalCode
    );

    // Act: Continue to checkout overview
    await checkoutPage.continueCheckout();

    // Assert: Verify navigation to the checkout overview
    await expect(checkoutOverviewPage.pageTitle).toHaveText(
      messages.overview.title
    );
  }
);
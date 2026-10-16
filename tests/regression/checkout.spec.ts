
import { expect, test } from '../../fixtures/baseFixture';
import messages from '../../data/messages.json';
import users from '../../data/users.json';
import products from '../../data/products.json';

// Common Setup
test.beforeEach(async ({ authHelper }) => {
  await authHelper.loginAs(
    users.standardUser.username,
    users.standardUser.password
  );
});

// Test Scenario
test(
  'Complete checkout information and continue',
  async ({
    inventoryHelper,
    cartHelper,
    checkoutHelper,
    cartPage,
    checkoutOverviewPage,
  }) => {
    // Inventory
    await inventoryHelper.addProductToCart(products.backpack);

    // Cart
    await cartHelper.openCart();
    await expect(cartPage.cartItem).toHaveCount(1);
    await expect(cartPage.cartItem.first()).toBeVisible();

    // Checkout
    await checkoutHelper.proceedToCheckout(
      users.standardUser.firstName,
      users.standardUser.lastName,
      users.standardUser.postalCode
    );

    // Checkout Overview
    await expect(checkoutOverviewPage.pageTitle).toHaveText(
      messages.overview.title
    );
  }
);
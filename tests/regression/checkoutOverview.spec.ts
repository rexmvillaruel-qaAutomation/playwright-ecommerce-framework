
import { expect, test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';
import checkout from '../../data/checkout.json';
import messages from '../../data/messages.json';

// Common Setup
test.beforeEach(async ({ authHelper }) => {
  await authHelper.loginAs(
    users.standardUser.username,
    users.standardUser.password
  );
});

// Test Scenario
test(
  'Verify checkout overview information',
  async ({
    cartHelper,
    checkoutHelper,
    inventoryHelper,
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

    // Checkout Overview: Page title
    await expect(checkoutOverviewPage.pageTitle).toHaveText(
      messages.overview.title
    );

    // Product details
    await expect(checkoutOverviewPage.productName).toHaveText(
      products.backpack.name
    );
    await expect(checkoutOverviewPage.productQuantity).toHaveText(
      products.backpack.quantity
    );
    await expect(checkoutOverviewPage.productPrice).toHaveText(
      products.backpack.price
    );

    // Order summary
    await expect(checkoutOverviewPage.paymentInfo).toHaveText(
      checkout.orderSummary.paymentInformation
    );
    await expect(checkoutOverviewPage.shippingInfo).toHaveText(
      checkout.orderSummary.shippingInformation
    );
    await expect(checkoutOverviewPage.itemTotal).toContainText(
      checkout.orderSummary.itemTotal
    );
    await expect(checkoutOverviewPage.tax).toContainText(
      checkout.orderSummary.tax
    );
    await expect(checkoutOverviewPage.total).toContainText(
      checkout.orderSummary.total
    );
  }
);
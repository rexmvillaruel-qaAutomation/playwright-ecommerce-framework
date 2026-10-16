
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
  'Complete checkout successfully',
  async ({
    cartHelper,
    checkoutHelper,
    checkoutOverviewPage,
    checkoutCompletePage,
    inventoryHelper,
    inventoryPage,
    cartPage,
  }) => {
    // Inventory: Add product
    await inventoryHelper.addProductToCart(products.backpack);

    // Cart: Verify added product
    await cartHelper.openCart();
    await expect(cartPage.cartItem).toHaveCount(1);
    await expect(cartPage.cartItem.first()).toBeVisible();

    // Checkout: Enter customer information
    await checkoutHelper.proceedToCheckout(
      users.standardUser.firstName,
      users.standardUser.lastName,
      users.standardUser.postalCode
    );

    // Checkout Overview: Validate order details
    await expect(checkoutOverviewPage.pageTitle).toHaveText(
      messages.overview.title
    );
    await expect(checkoutOverviewPage.productName).toHaveText(
      products.backpack.name
    );
    await expect(checkoutOverviewPage.productQuantity).toHaveText(
      products.backpack.quantity
    );
    await expect(checkoutOverviewPage.productPrice).toHaveText(
      products.backpack.price
    );

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

    // Complete Checkout
    await checkoutOverviewPage.completeCheckout();

    await expect(checkoutCompletePage.title).toHaveText(
      messages.complete.title
    );
    await expect(checkoutCompletePage.completeHeader).toHaveText(
      messages.complete.header
    );
    await expect(checkoutCompletePage.completeText).toHaveText(
      messages.complete.message
    );
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
    await expect(checkoutCompletePage.generatePdfButton).toBeVisible();

    // Back to Inventory
    await checkoutCompletePage.clickBackHome();
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  }
);
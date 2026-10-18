import { expect, test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';
import checkout from '../../data/checkout.json';
import messages from '../../data/messages.json';

test(
  'Verify checkout overview information',
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

    // Assert: Verify the checkout overview page title
    await expect(checkoutOverviewPage.pageTitle).toHaveText(
      messages.overview.title
    );

    // Assert: Verify product details
    await expect(checkoutOverviewPage.productName).toHaveText(
      products.backpack.name
    );
    await expect(checkoutOverviewPage.productQuantity).toHaveText(
      products.backpack.quantity
    );
    await expect(checkoutOverviewPage.productPrice).toHaveText(
      products.backpack.price
    );

    // Assert: Verify payment and shipping information
    await expect(checkoutOverviewPage.paymentInfo).toHaveText(
      checkout.orderSummary.paymentInformation
    );
    await expect(checkoutOverviewPage.shippingInfo).toHaveText(
      checkout.orderSummary.shippingInformation
    );

    // Assert: Verify the order summary
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
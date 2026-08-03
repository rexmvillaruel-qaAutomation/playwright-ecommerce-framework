import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';

test('Complete checkout information', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await loginPage.goto();

  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );

  await inventoryPage.verifyLoaded();

  await inventoryPage.addBackpackToCart();

  await inventoryPage.openCart();

  await cartPage.verifyCartItemVisible();

  await cartPage.clickCheckout();

  await checkoutPage.fillCheckoutInformation(
    users.standardUser.firstName,
    users.standardUser.lastName,
    users.standardUser.postalCode
  );

  await checkoutPage.continueCheckout();
});
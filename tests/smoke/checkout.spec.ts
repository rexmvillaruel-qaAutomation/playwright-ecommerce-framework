import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';

test('Complete checkout information', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await loginPage.goto();

//Login function
  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );
//Inventory Page
  await inventoryPage.verifyLoaded();
  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();
//Cart Page
  await cartPage.verifyCartItemVisible();
  await cartPage.clickCheckout();
//Checkout Page
  await checkoutPage.fillCheckoutInformation(
    users.standardUser.firstName,
    users.standardUser.lastName,
    users.standardUser.postalCode
  );
  await checkoutPage.continueCheckout();

});
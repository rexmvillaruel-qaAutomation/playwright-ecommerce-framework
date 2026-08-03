import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';

test('Verify added item appears in cart', async ({
  loginPage,
  inventoryPage,
  cartPage,
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
});
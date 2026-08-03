import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';

test('Add backpack to cart', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();

  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );

  await inventoryPage.verifyLoaded();

  await inventoryPage.addBackpackToCart();

  await inventoryPage.verifyCartBadge('1');
});
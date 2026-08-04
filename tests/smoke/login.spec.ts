import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';

test('Valid user login', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
//Login
  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );
//Inventory
  await inventoryPage.verifyLoaded();
});
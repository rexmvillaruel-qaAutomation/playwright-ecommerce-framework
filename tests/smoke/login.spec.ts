
import { expect, test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';

test('Valid user login', async ({ loginPage, inventoryPage }) => {
  // Navigate to login page
  await loginPage.goto();

  // Perform login
  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );

  // Validate successful login
  await expect(inventoryPage.inventoryContainer).toBeVisible();
});
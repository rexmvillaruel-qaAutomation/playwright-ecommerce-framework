import { test, expect } from '../../fixtures/baseFixture';
import users from '../../data/users.json';

test('Valid user login', async ({ loginPage, page }) => {

  await loginPage.goto();

  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );

  await expect(page).toHaveURL(/inventory/);

});
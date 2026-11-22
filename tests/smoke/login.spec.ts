
import { expect, test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import { withDecryptedPassword } from '../../utils/credentials';

test('Valid user login', async ({ loginPage, inventoryPage }) => {

  // Decrypt the standard user's password before authentication.
  const standardUser = withDecryptedPassword(users.standardUser);

  // Navigate to login page
  await loginPage.goto();

  // Perform login
  await loginPage.login(
      standardUser.username,
      standardUser.password
  );

  // Validate successful login
  await expect(inventoryPage.inventoryContainer).toBeVisible();
});
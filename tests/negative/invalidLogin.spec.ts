import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import messages from '../../data/messages.json';

test('Invalid user login', async ({ loginPage }) => {
  await loginPage.goto();
// Login
  await loginPage.login(
    users.invalidUser.username,
    users.invalidUser.password
  );
// Error message
  await loginPage.verifyLoginError(
    messages.invalidUser.message
  )
});
import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import messages from '../../data/messages.json';

test('Lockout user login', async ({ loginPage }) => {
  await loginPage.goto();
// Login
  await loginPage.login(
    users.lockoutUser.username,
    users.lockoutUser.password
  );
// Error message
  await loginPage.verifyLoginError(
    messages.lockoutUser.message
  )
});
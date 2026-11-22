
import { expect, test } from '../../fixtures/baseFixture';
import negativeLogindata from '../../data/negativeLoginData.json';
import { withDecryptedPassword } from '../../utils/credentials';

Object.values(negativeLogindata).forEach(testCase => {
  test(testCase.testName, async ({ loginPage }) => {
    
    // Decrypt the test password before executing the login scenario.
    const credentials = withDecryptedPassword(testCase);

    // Open Login page
    await loginPage.goto();

    // Login using credentials
    await loginPage.login(
      testCase.username,
      testCase.password
    );

    // Verify error message
    await expect(loginPage.errorMessage).toHaveText(
      testCase.expectedMessage
    );
  });
});
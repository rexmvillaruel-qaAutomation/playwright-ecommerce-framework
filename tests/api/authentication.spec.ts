import { test, expect } from '../../fixtures/apiFixture';
import authenticationData from '../../data/apiAuthenticationData.json';
import { withDecryptedPassword } from '../../utils/credentials';

Object.values(authenticationData).forEach(testCase => {

  test(testCase.testName, async ({ authApiClient }) => {

    // Decrypt credentials before sending the API authentication request.
    const credentials = withDecryptedPassword(testCase);

    const response = await authApiClient.createAuthToken({
      username: credentials.username,
      password: credentials.password,
    });

    expect(response.status()).toBe(testCase.expectedStatus);

    const responseBody = await response.json();

    if (testCase.expectedToken) {
      expect(responseBody.token).toBeDefined();
      expect(responseBody.token).not.toBe('');
    }

    if (testCase.expectedReason) {
      expect(responseBody.reason).toBe(testCase.expectedReason);
    }

  });

});
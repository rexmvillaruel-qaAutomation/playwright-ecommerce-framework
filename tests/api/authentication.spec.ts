import { test, expect } from '../../fixtures/apiFixture';
import authenticationData from '../../data/apiAuthenticationData.json';

Object.values(authenticationData).forEach(testCase => {

  test(testCase.testName, async ({ authApiClient }) => {

    const response = await authApiClient.createAuthToken({
      username: testCase.username,
      password: testCase.password,
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
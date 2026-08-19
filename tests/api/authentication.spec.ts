import { test, expect } from '../../fixtures/apiFixture';

test('Create Auth Token - Valid Credentials', async ({ authApiClient }) => {
  const response = await authApiClient.createAuthToken({
    username: 'admin',
    password: 'password123',
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.token).toBeDefined();
  expect(responseBody.token).not.toBe('');
});

test('Negative - Create Auth Token with Invalid Credentials', async ({ authApiClient }) => {
  const response = await authApiClient.createAuthToken({
    username: 'admin',
    password: 'wrongpassword',
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.reason).toBe('Bad credentials');
});
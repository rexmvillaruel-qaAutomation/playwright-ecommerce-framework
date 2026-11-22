
import { test, expect } from '@playwright/test';
import { randomBytes } from 'node:crypto';
import { encrypt } from '../../utils/crypto';
import { withDecryptedPassword } from '../../utils/credentials';

// Use a temporary key to avoid depending on real test credentials.
test.beforeEach(() => {
  process.env.ENCRYPTION_KEY = randomBytes(32).toString('hex');
});

test.afterEach(() => {
  delete process.env.ENCRYPTION_KEY;
});

test.describe('Credential Utility', () => {
  test('should decrypt a password and preserve other fields', () => {
    const credential = {
      username: 'test_user',
      password: encrypt('DummyPassword123!'),
      testName: 'Example login test',
      expectedStatus: 200,
    };

    const result = withDecryptedPassword(credential);

    expect(result.username).toBe('test_user');
    expect(result.password).toBe('DummyPassword123!');
    expect(result.testName).toBe('Example login test');
    expect(result.expectedStatus).toBe(200);
  });

  test('should not mutate the original credential object', () => {
    const credential = {
      username: 'test_user',
      password: encrypt('DummyPassword123!'),
    };

    const result = withDecryptedPassword(credential);

    expect(credential.password).not.toBe(result.password);
    expect(result).not.toBe(credential);
  });

  test('should reject credentials encrypted with a different key', () => {
    const credential = {
      username: 'test_user',
      password: encrypt('DummyPassword123!'),
    };

    process.env.ENCRYPTION_KEY = randomBytes(32).toString('hex');

    expect(() => withDecryptedPassword(credential)).toThrow();
  });
});

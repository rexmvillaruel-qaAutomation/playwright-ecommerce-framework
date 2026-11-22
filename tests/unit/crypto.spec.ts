
import { test, expect } from '@playwright/test';
import { randomBytes } from 'node:crypto';
import { encrypt, decrypt } from '../../utils/crypto';

// Generate an isolated test key without using real credentials.
test.beforeEach(() => {
  process.env.ENCRYPTION_KEY = randomBytes(32).toString('hex');
});

test.afterEach(() => {
  delete process.env.ENCRYPTION_KEY;
});

test.describe('Crypto Utility', () => {
  test('should encrypt and decrypt a password correctly', () => {
    const password = 'DummyPassword123!';

    const encrypted = encrypt(password);
    const decrypted = decrypt(encrypted);

    expect(encrypted).not.toBe(password);
    expect(decrypted).toBe(password);
  });

  test('should generate different ciphertext for the same password', () => {
    const password = 'DummyPassword123!';

    const first = encrypt(password);
    const second = encrypt(password);

    expect(first).not.toBe(second);
    expect(decrypt(first)).toBe(password);
    expect(decrypt(second)).toBe(password);
  });

  test('should reject tampered ciphertext', () => {
    const encrypted = encrypt('DummyPassword123!');
    const parts = encrypted.split(':');

    // Change one byte while preserving valid hexadecimal formatting.
    const ciphertext = parts[2];
    parts[2] =
      (ciphertext.slice(0, 2) === '00' ? '01' : '00') +
      ciphertext.slice(2);

    expect(() => decrypt(parts.join(':'))).toThrow();
  });

  test('should reject an invalid encryption key', () => {
    process.env.ENCRYPTION_KEY = 'invalid-key';

    expect(() => encrypt('DummyPassword123!')).toThrow(
      'ENCRYPTION_KEY must be a 64-character hexadecimal string.'
    );
  });

  test('should reject malformed encrypted input', () => {
    expect(() => decrypt('invalid-encrypted-data')).toThrow(
      'Invalid encrypted password format.'
    );
  });

  test('should reject decryption with a different key', () => {
    const encrypted = encrypt('DummyPassword123!');

    // Replace the original key with a different valid key.
    process.env.ENCRYPTION_KEY = randomBytes(32).toString('hex');

    expect(() => decrypt(encrypted)).toThrow();
  });
});

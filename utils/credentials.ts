
import { decrypt } from './crypto';

// Represents test data containing an encrypted password.
type EncryptedCredential = {
  username: string;
  password: string;
};

// Return a credential object with its password decrypted.
// Preserve other fields such as testName and expectedMessage.
export function withDecryptedPassword<T extends EncryptedCredential>(
  credential: T
): T {
  return {
    ...credential,
    password: decrypt(credential.password),
  };
}

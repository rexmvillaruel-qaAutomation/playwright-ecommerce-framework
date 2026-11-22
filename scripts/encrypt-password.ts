
import 'dotenv/config';
import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { encrypt } from '../utils/crypto';

// Prompt the user for a password without accepting CLI arguments.
async function readPassword(): Promise<string> {
  if (!stdin.isTTY || !stdout.isTTY) {
    throw new Error('Run this script in an interactive terminal.');
  }

  return new Promise((resolve, reject) => {
    const rl = createInterface({
      input: stdin,
      output: stdout,
      terminal: true,
    });

    // Hide typed characters while preserving the input prompt.
    const hiddenOutput = rl as typeof rl & {
      _writeToOutput: (text: string) => void;
    };

    hiddenOutput._writeToOutput = (text: string) => {
      if (text.includes('Enter password:')) {
        stdout.write(text);
      }
    };

    rl.question('Enter password: ', (password) => {
      rl.close();

      if (!password) {
        reject(new Error('Password cannot be empty.'));
        return;
      }

      resolve(password);
    });
  });
}

// Encrypt the entered password and display only the encrypted result.
async function main(): Promise<void> {
  try {
    const password = await readPassword();
    const encryptedPassword = encrypt(password);

    console.log('\nEncrypted password:');
    console.log(encryptedPassword);
    console.log('\nCopy this value into your test data.');
  } catch (error) {
    console.error(
      'Encryption failed:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    process.exitCode = 1;
  }
}

void main();


import { spawnSync } from 'node:child_process';
import readline from 'node:readline';
import { resolve } from 'node:path';

// Create a terminal interface for interactive menu selections.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask the user a question and return their answer.
function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Execute Playwright with the selected command-line arguments.

function runPlaywright(args: string[]): number {
  console.log(`\nRunning: node Playwright CLI test ${args.join(' ')}\n`);

  // Resolve the Playwright CLI installed in this project's dependencies.
  const playwrightCli = resolve(
    'node_modules',
    '@playwright',
    'test',
    'cli.js',
  );

  // Launch the CLI directly with Node.js, without using a shell.
  const result = spawnSync(
    process.execPath,
    [playwrightCli, 'test', ...args],
    {
      stdio: 'inherit',
    },
  );

  // Handle errors that prevent Playwright from starting.
  if (result.error) {
    console.error('Failed to start Playwright:', result.error.message);
    return 1;
  }

  // Report a non-zero exit code if the process was terminated by a signal.
  return result.status ?? 1;
}


async function main(): Promise<number> {
  console.log('\n=== Playwright Test Runner ===');
  console.log('1. UI tests');
  console.log('2. API tests');
  console.log('3. All tests');

  const type = (await ask('Choose test type (1-3): ')).trim();

  // Validate the main menu selection.
  if (!['1', '2', '3'].includes(type)) {
    console.error('Invalid test type.');
    return 1;
  }

  const args: string[] = [];

  // Option 1: Run UI tests only.
  if (type === '1') {
    console.log('\n1. Smoke');
    console.log('2. Regression');
    console.log('3. Negative');
    console.log('4. All UI suites');

    const suite = (await ask('Choose UI suite (1-4): ')).trim();

    // Map each suite selection to its test folder.
    const suitePaths: Record<string, string[]> = {
      '1': ['tests/smoke'],
      '2': ['tests/regression'],
      '3': ['tests/negative'],
      '4': ['tests/smoke', 'tests/regression', 'tests/negative'],
    };

    if (!suitePaths[suite]) {
      console.error('Invalid UI suite.');
      return 1;
    }

    args.push(...suitePaths[suite]);

    console.log('\n1. Chromium');
    console.log('2. Firefox');
    console.log('3. WebKit');
    console.log('4. All browsers');

    const browser = (await ask('Choose browser (1-4): ')).trim();

    // Map browser selections to the project names in playwright.config.ts.
    const browserProjects: Record<string, string[]> = {
      '1': ['chromium'],
      '2': ['firefox'],
      '3': ['webkit'],
      '4': ['chromium', 'firefox', 'webkit'],
    };

    if (!browserProjects[browser]) {
      console.error('Invalid browser.');
      return 1;
    }

    // Ask whether the browser should be visible during execution.
    console.log('\n1. Headed (visible browser)');
    console.log('2. Headless (no visible browser)');

    const mode = (await ask('Choose mode (1-2): ')).trim();

    if (!['1', '2'].includes(mode)) {
      console.error('Invalid execution mode.');
      return 1;
    }

    // Headed mode opens the browser window; headless is Playwright's default.
    if (mode === '1') {
      args.push('--headed');
    }

    // Add the selected UI projects to the command.
    for (const project of browserProjects[browser]) {
      args.push('--project', project);
    }
  }

  // Option 2: Run API tests only, using the dedicated API project.
  else if (type === '2') {
    args.push('--project', 'api');
  }

  // Option 3: Run all UI tests in all browsers and API tests once.
  else if (type === '3') {
    args.push('--project', 'chromium');
    args.push('--project', 'firefox');
    args.push('--project', 'webkit');
    args.push('--project', 'api');
  }

  return runPlaywright(args);
}

// Run the menu and always close the terminal interface afterward.
main()
  .then((exitCode) => {
    process.exitCode = exitCode;
    rl.close();
  })
  .catch((error: unknown) => {
    console.error('Runner failed:', error);
    process.exitCode = 1;
    rl.close();
  });

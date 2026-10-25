
/**
 * Import Playwright configuration helpers and browser device presets.
 */
import { defineConfig, devices } from '@playwright/test';

/**
 * Load validated environment configuration, including the UI base URL.
 */
import { config } from './utils/config';

export default defineConfig({
  // Root directory containing all UI and API test files.
  testDir: './tests',

  // Allow independent tests to run in parallel.
  fullyParallel: true,

  // Prevent accidental test.only usage in CI.
  forbidOnly: !!process.env.CI,

  // Retry failed tests twice in CI; do not retry locally.
  retries: process.env.CI ? 2 : 0,

  // Use one worker in CI for more predictable execution.
  // Locally, let Playwright choose the default worker count.
  workers: process.env.CI ? 1 : undefined,

  // Generate an HTML report after the test run.
  reporter: 'html',

  // Default settings shared by the projects below.
  use: {
    // Base URL for UI tests.
    baseURL: config.uiBaseUrl,

    // Use data-test attributes with getByTestId().
    testIdAttribute: 'data-test',

    // Capture screenshots only when a test fails.
    screenshot: 'only-on-failure',

    // Capture a trace when a test is retried.
    trace: 'on-first-retry',
  },

  projects: [
    {
      // Run UI tests in the Chromium browser.
      name: 'chromium',

      // Include only smoke, regression, and negative UI tests.
      testMatch: /(?:smoke|regression|negative)\/.*\.spec\.ts$/,

      // Use the default desktop Chrome-like browser configuration.
      use: { ...devices['Desktop Chrome'] },
    },

    {
      // Run the same UI suites in Firefox.
        name: 'firefox',
        testMatch: /(?:smoke|regression|negative)\/.*\.spec\.ts$/,
        use: { ...devices['Desktop Firefox'] },
    },

    {
      // Run the same UI suites in WebKit.
      name: 'webkit',
      testMatch: /(?:smoke|regression|negative)\/.*\.spec\.ts$/,
      use: { ...devices['Desktop Safari'] },
    },

    {
      // Run API tests separately, without a browser project.
      name: 'api',

      // Include only API spec files.
      testMatch: /api\/.*\.spec\.ts$/,

      // API tests should configure their own APIRequestContext or API fixture.
      // No browser device is configured for this project.
      use: {
        baseURL: undefined,
      },
    },
  ],
});

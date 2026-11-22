
# Playwright E-Commerce Automation Framework

## 📌 Project Overview

This project is an end-to-end test automation framework built with **Playwright and TypeScript**.

It automates the SauceDemo e-commerce application using the Page Object Model (POM), reusable components, custom fixtures, centralized test data, type-safe data models, API testing, environment-based configuration, cross-browser execution, HTML reporting, and GitHub Actions for Continuous Integration (CI).

The framework emphasizes separation of concerns by organizing UI interactions, shared components, test scenarios, API operations, test data, and configuration into dedicated layers.

## Purpose

This project was built to strengthen my expertise in Playwright and modern test automation framework design.

While I have prior experience with Selenium, WebdriverIO, UFT, Appium, Karate Framework, and TOSCA, this repository focuses on applying Playwright and TypeScript through clean architecture, the Page Object Model, fixtures, centralized test data, type-safe models, API testing, CI practices, and cross-browser automation.

The framework demonstrates how an automation solution can evolve through implementation, code review, architectural evaluation, and refactoring.

---

## 🚀 Tech Stack

- Playwright

- TypeScript

- Node.js

- Git and GitHub

- GitHub Actions

- REST API Testing

- dotenv

- Playwright HTML Reporting

---

## 📁 Project Structure

```text
playwright-ecommerce-framework/

│

├── .github/

│   └── workflows/

│

├── api/

│   ├── clients/

│   └── types/

│

├── components/

│

├── data/

│

├── fixtures/

│

├── pages/

│

├── tests/

│   ├── api/

│   ├── negative/

│   ├── regression/

│   └── smoke/

│

├── utils/

│

├── .gitignore

├── package.json

├── playwright.config.ts

├── tsconfig.json

└── README.md
```

### Framework Layers

| Layer | Responsibility |
|---|---|
| `pages/` | Page-specific locators and UI actions |
| `components/` | Reusable UI components and interactions |
| `fixtures/` | Dependency injection and reusable test setup |
| `api/clients/` | API request operations |
| `api/types/` | TypeScript contracts for API data |
| `data/` | Centralized JSON test data |
| `utils/` | Shared utilities and environment configuration |
| `tests/` | Test scenarios, workflow orchestration, and assertions |
| `.github/workflows/` | Continuous Integration configuration |

## Test Suite Organization

Test scenarios are organized by testing purpose.

| Suite | Responsibility |
|---|---|
| `tests/smoke/` | Critical-path tests for fast feedback |
| `tests/regression/` | Broader functional and end-to-end coverage |
| `tests/negative/` | Negative and edge-case scenarios |
| `tests/api/` | API-level validation |

Smoke tests provide fast feedback on critical functionality. Regression tests provide broader functional coverage, while negative and API scenarios are maintained separately because they address distinct testing concerns.

---

## ✅ Test Coverage

The automation suite covers both UI and API scenarios.

### UI Test Coverage

- Login

- Invalid login scenarios

- Add Product to Cart

- Cart Validation

- Checkout Information

- Checkout Overview

- Checkout Completion

- Return to Inventory

- End-to-end purchase workflow

### API Test Coverage

- Authentication requests

- Valid authentication credentials

- Invalid authentication credentials

- HTTP status validation

- Response body validation

- Dynamic authentication token validation

- Data-driven API authentication scenarios

The UI automation uses **SauceDemo** as the application under test.

API automation uses **Restful Booker** as a separate API target.

---

## 🏗 Framework Design

The framework follows a layered automation architecture based on the Page Object Model, separation of concerns, dependency injection, reusable components, and data-driven testing.

### Key Components

**Page Object Model (POM)**

Encapsulates page-specific locators and UI actions. Page Objects expose the interactions and locators that test scenarios need without owning scenario-specific assertions.

**Reusable Components**

Encapsulate shared UI sections and interactions. For example, the `Header` component owns shared header functionality such as opening the shopping cart.

**Fixtures**

Provide centralized dependency injection for Page Objects and reusable components. This reduces repetitive setup and gives test specs direct access to the objects they need.

**Centralized Test Data**

Stores users, products, checkout information, authentication data, and validation data in dedicated JSON files.

**Type-Safe Test Data Models**

Uses TypeScript interfaces and types to provide structured, type-safe test data.

**API Client Layer**

Encapsulates API request operations separately from API test scenarios.

**Environment-Based Configuration**

Centralizes environment-specific URLs using environment variables rather than hardcoding them throughout the framework.

**Data-Driven Testing**

Separates test data from test logic to make scenarios easier to maintain and extend.

**Cross-Browser Testing**

Supports Chromium, Firefox, and WebKit execution.

**Failure Screenshots and Tracing**

Captures screenshots on failure and collects traces on the first retry to support debugging.

**HTML Reporting**

Generates Playwright HTML reports for test execution results and failure investigation.

**GitHub Actions CI**

Integrates automated Playwright test execution into the development workflow.

---

## 🧩 Reusable Component Architecture

Shared UI behavior is extracted into reusable components when it belongs to a common interface section rather than a specific page.

For example:

```text
components/

└── Header.ts
```

The `Header` component owns shared header functionality such as opening the shopping cart.

This keeps shared navigation separate from inventory-specific behavior and avoids placing unrelated responsibilities inside `InventoryPage`.

The responsibilities are separated as follows:

```text
Header

└── Shared navigation

    └── openCart()

InventoryPage

└── Inventory-specific locators and actions

CartPage

└── Cart-specific locators and actions
```

Test specs coordinate these objects to execute a scenario. This makes the workflow explicit while allowing each component or Page Object to remain focused on its own UI responsibilities.

---

## 🧪 Test Design and Assertion Strategy

### Page Objects and Components

Page Objects and components are responsible for:

- Defining relevant locators.

- Encapsulating UI interactions.

- Providing reusable actions.

- Hiding low-level interaction details from test scenarios.

They do not own scenario-specific assertions.

### Test Specs

Test specs are responsible for:

- Orchestrating the test workflow.

- Calling Page Object and component actions.

- Defining expected application behavior.

- Performing assertions using Playwright's `expect` API.

For example, a Page Object can expose a locator for the inventory container, while the test spec verifies that the container is visible.

This separation makes test intent explicit and allows the same Page Object to be reused across scenarios with different expectations.

---

## 🔄 Architecture Refactoring Decisions

The framework's architecture evolved through reviewing the actual implementation and evaluating whether each abstraction provided meaningful value.

### 1. Why the Initial Design Used Helpers

The initial implementation included Helper classes to encapsulate operations, reduce workflow logic inside test specs, and encourage reuse.

This was a reasonable design intention. Helpers can be valuable when they encapsulate complex workflows, meaningful reusable business operations, or orchestration that would otherwise be duplicated across tests.

However, reviewing the implementation revealed that some Helpers primarily forwarded calls to existing Page Objects or components without adding meaningful behavior.

The decision to refactor was based on the actual responsibilities of those classes, rather than assuming that Helpers are inherently a poor design choice.

### 2. Why the Helpers Were Removed

The following Helpers were removed after reviewing their implementation:

- **`InventoryHelper`** — primarily forwarded product-addition operations to `InventoryPage`.

- **`CartHelper`** — forwarded cart navigation to `Header` without providing meaningful additional behavior.

- **`CheckoutHelper`** — wrapped a straightforward checkout sequence that could be expressed clearly through existing Page Object actions.

- **`CheckoutOverviewHelper`** — primarily held a reference to `CheckoutOverviewPage` without providing meaningful additional functionality.

These abstractions introduced additional indirection without enough benefit to justify their maintenance cost.

Removing them simplified the dependency structure and made the test workflow easier to follow.

### 3. Why Test Specs Now Orchestrate Workflows

The test specs now call the relevant Page Object actions directly.

For example, a checkout scenario can express its sequence as:

1. Open the cart.

2. Proceed to checkout.

3. Enter checkout information.

4. Continue to the order overview.

5. Complete the purchase when required.

6. Verify the expected results.

This makes the scenario easier to understand during code review because the sequence of actions is visible in the test itself.

For the current framework, the checkout workflow is straightforward enough that a separate orchestration class is unnecessary.

A workflow abstraction may be reintroduced if future requirements introduce substantial conditional logic, complex orchestration, or meaningful reuse across multiple scenarios.

### 4. Why Assertions Remain in Test Specs

The refactoring establishes a clear boundary between executing actions and verifying results.

- **Page Objects and components** expose locators and perform UI actions.

- **Test specs** define expected behavior and execute assertions.

This avoids coupling Page Objects to individual test expectations. It also makes each test's purpose easier to identify and keeps UI interaction code reusable.

### 5. Why Fixture Registration Was Simplified

The fixture setup now registers Page Objects and reusable components instead of the removed Helpers.

This aligns dependency injection with the current architecture and eliminates fixture dependencies that are no longer needed.

Test specs receive the objects they use directly, resulting in a simpler dependency structure.

### 6. Why This Refactoring Improves the Framework

The refactoring focuses on reducing unnecessary indirection without sacrificing separation of concerns.

Its main benefits are:

- More transparent test workflows.

- Clearer ownership of UI actions and assertions.

- Fewer unnecessary abstraction layers.

- Simpler fixture registration.

- Easier code review and maintenance.

- A design that can accommodate additional abstractions when future complexity justifies them.

The objective is not to eliminate Helpers permanently. It is to ensure every abstraction has a clear responsibility and provides enough value to justify its existence.

### 7. Refactoring Validation

After the refactoring, the full Playwright test suite passed **30 out of 30 tests**.

This result provides evidence that the refactoring preserved the tested behavior while simplifying the implementation.

### 8. Lessons Learned

This refactoring reinforced several software engineering principles:

- **Abstractions should provide meaningful value.** A separate class is not automatically beneficial simply because it separates code into another file.

- **Separation of concerns should clarify responsibilities.** Page Objects, components, fixtures, and test specs have distinct roles.

- **Test intent should be visible.** Scenario orchestration and assertions belong in the specs so that expected behavior is easy to understand.

- **Architecture should evolve with evidence.** The original Helper design addressed a reasonable concern, but code review showed that direct calls were more appropriate for the current level of complexity.

- **Avoid both under-abstraction and over-abstraction.** Introduce additional layers when complexity, reuse, or maintainability provides a clear justification.

---

## 🔌 API Testing

API testing was introduced as part of the advanced automation phase.

### API Investigation

Before implementing API automation against SauceDemo, the application's network traffic was investigated to identify a legitimate business API.

The investigation found:

- Successful login did not generate an application Fetch/XHR authentication request.

- Invalid login attempts generated a `POST` request to `submit.backtrace.io`.

- The Backtrace request was identified as third-party error-reporting telemetry rather than a SauceDemo authentication API.

- Inspection of the frontend JavaScript bundle showed the application's known test usernames and `secret_sauce` password.

Based on these findings, the Backtrace endpoint was intentionally excluded from API automation.

### Engineering Decision

SauceDemo remains the UI application under test.

API automation uses **Restful Booker** as a separate API target rather than automating third-party telemetry or misrepresenting it as a SauceDemo business API.

### API Authentication Validation

The authentication tests validate:

- HTTP status code.

- Presence of the authentication token.

- Non-empty token value.

- Expected response behavior for invalid credentials.

The exact authentication token is not asserted because tokens are dynamically generated and may change between requests.

---

## ⚙️ Environment-Based Configuration

Environment-specific configuration is centralized in:

```text
utils/config.ts
```

The framework uses environment variables for the UI and API base URLs:

```dotenv
UI_BASE_URL=[https://www.saucedemo.com/](https://www.saucedemo.com/)

API_BASE_URL=[https://restful-booker.herokuapp.com](https://restful-booker.herokuapp.com)
```

The local `.env` file is excluded from source control through `.gitignore`.

This allows configuration to be changed without modifying the test code.

### CI Configuration

GitHub Actions provides the required environment variables through workflow configuration so that CI does not depend on a locally stored `.env` file.

This keeps environment configuration separate from the automation implementation.

---

## 📊 Reporting

The framework uses Playwright's HTML reporter.

Open the generated report with:

```bash
npx playwright show-report
```

Failure screenshots are configured using:

```typescript
screenshot: 'only-on-failure'
```

Tracing is configured to run on the first retry:

```typescript
trace: 'on-first-retry'
```

This provides useful visual and diagnostic evidence when tests fail while avoiding unnecessary screenshots and traces for successful tests.

---

## 🌐 Cross-Browser Testing

The framework supports the following Playwright browser projects:

- Chromium

- Firefox

- WebKit

Example configuration:

```typescript
projects: [

  {

    name: 'chromium',

    use: { ...devices['Desktop Chrome'] },

  },

  {

    name: 'firefox',

    use: { ...devices['Desktop Firefox'] },

  },

  {

    name: 'webkit',

    use: { ...devices['Desktop Safari'] },

  },

]
```

Cross-browser execution helps identify browser-specific behavior and provides broader confidence in the automation suite.

---

## 🤖 Continuous Integration

GitHub Actions is configured to execute the Playwright test suite automatically.

The CI workflow:

1. Checks out the repository.

2. Sets up Node.js.

3. Installs project dependencies.

4. Installs Playwright browsers.

5. Configures required environment variables.

6. Executes the Playwright test suite.

7. Uploads the Playwright HTML report as an artifact.

This provides an additional validation layer when changes are pushed to the repository or submitted through a pull request.

---

## 🧪 Running Tests

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

### Run All Tests

```bash
npx playwright test
```

### Run a Single Test

```bash
npx playwright test tests/smoke/login.spec.ts
```

### Run in Headed Mode

```bash
npx playwright test --headed
```

### Run in Debug Mode

```bash
npx playwright test --debug
```

### Open HTML Report

```bash
npx playwright show-report
```

### TypeScript Validation

```bash
npx tsc --noEmit
```

---

## 📅 Roadmap

### ✅ Phase 1 — Core Framework Implementation

- [x] Login

- [x] Inventory

- [x] Cart

- [x] Checkout

- [x] Checkout Overview

- [x] Checkout Complete

- [x] Page Object Model

- [x] Reusable Fixtures

- [x] Centralized Test Data

- [x] GitHub Actions Integration

### ✅ Phase 2 — Framework Refactoring

- [x] `beforeEach` Hooks

- [x] TypeScript Data Types

- [x] Type-Safe Test Data Models

- [x] Reduction of Duplicate Code

- [x] Separation of Test Responsibilities

- [x] Review and Removal of Redundant Helpers

- [x] Direct Workflow Orchestration in Test Specs

- [x] Simplified Fixture Registration

### ✅ Phase 3 — Advanced Automation

- [x] Negative and Edge-Case Scenarios

- [x] Advanced Data-Driven Testing

- [x] API Testing Investigation

- [x] API Testing Implementation

- [x] Environment-Based Configuration

- [x] Reporting Enhancements

- [x] Cross-Browser Test Execution

- [x] Reusable UI Components

---

## 📝 Engineering Decisions

### Why use Page Objects?

Page Objects isolate page-specific locators and UI actions from test scenarios, making the framework easier to maintain when locators or page behavior change.

### Why use Fixtures?

Fixtures provide centralized dependency injection for Page Objects and components, reducing repetitive setup code across tests.

### Why use Data-Driven Testing?

Test data is separated from test logic, making it easier to add scenarios without duplicating test implementation.

### Why use API Testing alongside UI Testing?

API tests provide faster and more focused validation of API behavior, while UI tests validate user-facing workflows. Using both layers improves coverage and helps isolate failures.

### Why use a separate API target?

The SauceDemo investigation did not identify a legitimate business authentication API. The observed Backtrace request was third-party telemetry, so Restful Booker was selected as a separate API target for demonstrating API automation.

### Why use Environment-Based Configuration?

Environment variables prevent environment-specific URLs from being hardcoded throughout the framework and allow local and CI environments to use different configuration values.

### Why create a reusable Header component?

Shopping cart navigation belongs to the application's shared header rather than specifically to the inventory page. Moving this functionality into a reusable `Header` component reduces coupling and improves separation of concerns.

### Why separate Smoke and Regression suites?

Smoke tests provide a focused set of critical-path checks that can be executed quickly to determine whether the application is stable enough for further testing.

Regression tests provide broader functional and end-to-end coverage to validate existing functionality after changes.

This separation allows the framework to provide fast feedback through smoke testing while retaining comprehensive regression coverage.

---

## 📈 Current Validation

The framework has been validated through:

- TypeScript compilation.

- Local Playwright execution.

- Chromium execution.

- Firefox execution.

- WebKit execution.

- Full test suite execution.

- GitHub Actions CI execution.

The full test suite has passed **30 tests out of 30** in the reported refactoring validation run.

---

## Interactive Playwright Test Runner

This framework includes an interactive CLI runner that allows users to select which tests to execute without manually typing Playwright commands.

### Start the Test Runner

Run the following command from the project root:

```bash
npm run runner
```

### Available Test Options

**1. UI Tests**

Choose a UI test suite:

- **Smoke** — Run smoke tests.

- **Regression** — Run regression tests.

- **Negative** — Run negative test scenarios.

- **All UI Suites** — Run all smoke, regression, and negative tests.

Choose the browser:

- Chromium

- Firefox

- WebKit

- All Browsers

Choose the execution mode:

- **Headed** — Display the browser during test execution.

- **Headless** — Run tests without displaying the browser window.

**2. API Tests**

Run API tests using the dedicated `api` Playwright project.

**3. All Tests**

Run all configured test projects:

- Chromium UI tests

- Firefox UI tests

- WebKit UI tests

- API tests

### Key Benefits

- Simplifies test execution through an interactive terminal menu.

- Supports selective execution of UI test suites and API tests.

- Enables cross-browser testing with Chromium, Firefox, and WebKit.

- Supports both headed and headless UI execution.

- Provides a convenient entry point for local test execution.

---

## 🔐 Credential Encryption and Security — November 2026 Enhancement

The framework now includes **AES-256-GCM authenticated encryption** for test passwords used by UI and API authentication scenarios. It separates credential preparation from Page Object interactions and API request operations.

### Added Files and Test Project

The following files and directories extend the project structure shown above:

```text
playwright-ecommerce-framework/
├── scripts/
│   └── encrypt-password.ts
├── utils/
│   ├── crypto.ts
│   └── credentials.ts
├── tests/
│   └── unit/
│       ├── crypto.spec.ts
│       └── credentials.spec.ts
└── .env.example
```

| File | Responsibility |
|---|---|
| `scripts/encrypt-password.ts` | Provides an interactive CLI for encrypting test passwords before storing them in JSON |
| `utils/crypto.ts` | Implements encryption and decryption using Node.js's built-in `crypto` module |
| `utils/credentials.ts` | Decrypts a credential password while preserving the credential object's other fields |
| `tests/unit/crypto.spec.ts` | Tests cryptographic behavior and error handling |
| `tests/unit/credentials.spec.ts` | Tests credential transformation and preservation of test data |
| `.env.example` | Documents environment variables without exposing the real encryption key |

The framework includes a dedicated **`unit` Playwright project** in addition to the existing Chromium, Firefox, WebKit, and API projects. Unit tests validate utilities without requiring browser interaction.

### Encrypted Test Data

Encrypted password values are stored in these existing JSON files:

| Data File | Usage |
|---|---|
| `data/users.json` | Standard SauceDemo login credentials |
| `data/negativeLoginData.json` | Invalid-user and locked-out-user login scenarios |
| `data/apiAuthenticationData.json` | Valid and invalid Restful Booker API authentication scenarios |

A total of **five password entries** were encrypted. The usernames, checkout information, scenario names, expected messages, and API expectations remain unchanged.

### How Encryption Works

The implementation uses:

- **AES-256-GCM** for authenticated encryption.
- A **32-byte encryption key**, supplied as 64 hexadecimal characters.
- A new random **12-byte initialization vector (IV)** for each encryption operation.
- A **16-byte authentication tag** to help detect tampering or incorrect decryption keys.
- A serialized encrypted value in the format `IV:AUTH_TAG:CIPHERTEXT` (hexadecimal components).

Because a random IV is generated each time, encrypting an identical password twice produces different encrypted outputs.

Before a UI login or API authentication request, `withDecryptedPassword()` returns a new credential object with a decrypted password. This keeps cryptographic responsibilities outside `LoginPage.ts` and the API client and avoids modifying the original imported JSON object.

### Local Environment Setup

The `.env.example` file documents the required environment variables:

```dotenv
UI_BASE_URL=https://www.saucedemo.com/
API_BASE_URL=https://restful-booker.herokuapp.com
ENCRYPTION_KEY=
```

Create a local `.env` file with those settings. Generate a secure random encryption key using:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Set `ENCRYPTION_KEY` in `.env` to the generated 64-character hexadecimal value. Do not commit `.env` or share the key.

**Important for repository clones:** The encrypted passwords committed to the repository can only be decrypted with the key used to encrypt them. A newly generated key cannot decrypt existing ciphertext. Developers using their own keys must **re-encrypt all five demonstration passwords in the three JSON files** with their new key before running credential-dependent tests.

### Encrypting a Password

Run the interactive encryption CLI from the project root:

```bash
npx tsx scripts/encrypt-password.ts
```

Enter the password at the prompt and copy the encrypted result into the corresponding JSON test data entry. The script is designed to accept password input interactively rather than as a command-line argument.

### Security Scope and Limitations

- The encryption key is excluded from source control through `.gitignore` and supplied at runtime through the environment.
- GitHub Actions uses an `ENCRYPTION_KEY` repository secret rather than hardcoding the key in workflow YAML.
- The GitHub Actions secret must match the key used to encrypt the committed JSON values.
- Encrypted passwords remain **reversible** to anyone who obtains the ciphertext and matching key.
- Decrypted passwords exist in memory during login and API authentication; traces, reports, and logs must be treated as potentially sensitive artifacts.
- This feature demonstrates credential-handling architecture with **public demonstration credentials**. For genuine private or production secrets, environment-based secrets or a dedicated secret manager is generally preferable to committing encrypted password values.

---

## 🧪 Cryptography and Credential Unit Tests — November 2026 Enhancement

The framework includes **nine dedicated unit tests** covering both cryptographic functions and credential transformation.

### Crypto Utility Tests (6)

- Encrypting and decrypting a password successfully.
- Producing different encrypted values for the same plaintext through random IV generation.
- Rejecting tampered ciphertext.
- Rejecting an invalid encryption key.
- Rejecting malformed encrypted input.
- Rejecting decryption using a different key.

### Credential Utility Tests (3)

- Decrypting the password while preserving other credential fields.
- Returning a new object without mutating the original credential data.
- Rejecting credentials encrypted with a different key.

The unit tests use generated dummy credentials and temporary encryption keys rather than the project's stored credential key.

Run the unit suite independently:

```bash
npx playwright test --project=unit --workers=1
```

Run the selected Chromium UI, API, and unit test projects together:

```bash
npx playwright test --project=chromium --project=api --project=unit --workers=1
```

---

## 🔎 Trace Viewer and Debugging — November 2026 Enhancement

**Current tracing configuration:** The original Reporting section above documents the earlier `on-first-retry` setting. The framework was subsequently updated to retain failure traces locally while continuing to use first-retry tracing in CI.

```typescript
trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
```

| Environment | Trace Behavior |
|---|---|
| Local development | Retain a trace when a test fails, even without a retry |
| GitHub Actions CI | Record a trace on the first retry |

To inspect an available trace, open the Playwright HTML report and select the trace attachment for the applicable test:

```bash
npx playwright show-report
```

For a one-off debugging run that records a trace regardless of pass or fail:

```bash
npx playwright test tests/smoke/login.spec.ts --project=chromium --trace on
```

The Trace Viewer can help investigate test actions, DOM snapshots, network activity, and failure timing. Trace artifacts may contain sensitive test data and should be shared only with appropriate access controls.

The local failure-retention behavior was configured separately from the existing first-retry CI behavior. The 35-test validation result below is a passing-suite result; it does not by itself verify the failure-only trace retention path.

---

## 🤖 GitHub Actions Encryption Key Integration — November 2026 Enhancement

To support encrypted credentials during CI, the workflow supplies the encryption key only to the Playwright execution step:

```yaml
- name: Run Playwright tests
  env:
    ENCRYPTION_KEY: ${{ secrets.ENCRYPTION_KEY }}
  run: npx playwright test
```

Configure the `ENCRYPTION_KEY` secret in the GitHub repository under **Settings → Secrets and variables → Actions**, using the same key that was used for the JSON credentials.

The CI workflow continues to execute the configured Chromium, Firefox, WebKit, API, and unit projects and uploads the HTML report artifact. GitHub Actions repository secrets are normally unavailable to workflows triggered by pull requests from external forks; those runs may require a separate, safe strategy for test credentials.

---

## 📈 Latest Local Validation — November 2026 Enhancement

After integrating credential encryption, unit tests, and CI secret configuration, the complete locally configured Playwright test suite was executed successfully.

| Test Suite | Passed |
|---|---:|
| Chromium UI | 8 |
| Firefox UI | 8 |
| WebKit UI | 8 |
| API Authentication | 2 |
| Unit Tests | 9 |
| **Total** | **35** |

**Latest reported local result: 35 out of 35 tests passed.**

The earlier **30 out of 30** result documented above remains as the historical validation checkpoint for the framework refactoring milestone. The 35-test result reflects the later addition of cryptographic and credential unit tests. Local validation is not a substitute for confirming the results of an actual GitHub Actions run.

---

## 📝 Additional Engineering Decisions — November 2026 Enhancement

### Why choose AES-256-GCM instead of AES-256-CBC?

AES-256-GCM provides authenticated encryption. Its authentication tag allows decryption to reject altered ciphertext or a mismatched key, while CBC encryption alone does not provide equivalent integrity protection.

### Why separate encryption utilities from Page Objects?

`LoginPage.ts` remains responsible for user interface interactions. Credential decryption is performed before calling its login action, allowing UI automation to remain independent of the encryption format.

### Why use a generic credential transformer instead of another Helper?

`withDecryptedPassword()` implements a focused, reusable transformation that is applicable to positive UI, negative UI, and API authentication scenarios. It adds actual behavior without introducing a Helper class that only delegates existing methods.

### Why add a dedicated unit test project?

Cryptographic behavior and credential transformations can be validated without browser navigation. Separating these tests provides faster, more focused feedback and helps isolate defects in utility code.

### Why store the encryption key in GitHub Actions Secrets?

A repository secret allows the CI workflow to supply the key at execution time without embedding the secret value in version-controlled configuration. Repository access and artifact exposure must still be managed carefully.

---

## 👨‍💻 Author

Developed by **Rex Melvin Villaruel** using Playwright and TypeScript as a portfolio project focused on modern UI and API test automation, maintainable framework design, cross-browser testing, CI/CD, and continuous improvement in test automation engineering.
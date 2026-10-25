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
UI_BASE_URL=https://www.saucedemo.com/
API_BASE_URL=https://restful-booker.herokuapp.com
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

## 👨‍💻 Author

Developed by **Rex Melvin Villaruel** using Playwright and TypeScript as a portfolio project focused on modern UI and API test automation, maintainable framework design, cross-browser testing, CI/CD, and continuous improvement in test automation engineering.
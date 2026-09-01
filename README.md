# Playwright E-Commerce Automation Framework

## 📌 Project Overview

This project is an end-to-end test automation framework built with **Playwright and TypeScript**.

It automates the SauceDemo e-commerce application using the **Page Object Model (POM)**, reusable helpers, custom fixtures, reusable components, centralized test data, type-safe data models, API testing, environment-based configuration, cross-browser execution, HTML reporting, and GitHub Actions for Continuous Integration (CI).

The framework is designed with **separation of concerns** in mind, keeping UI interactions, shared components, reusable business flows, API clients, test data, configuration, and test scenarios organized into dedicated layers.

---

## Purpose

This project was built to strengthen my expertise in Playwright and modern test automation framework design.

While I have prior experience with tools such as Selenium, WebdriverIO, UFT, Appium, Karate Framework, and TOSCA, this repository focuses on applying **Playwright and TypeScript** using clean architecture, Page Object Model (POM), reusable helpers, fixtures, centralized test data, type-safe models, API testing, CI/CD practices, and cross-browser automation.

The framework demonstrates how a test automation solution can evolve from basic UI tests into a more maintainable and scalable automation framework.

---

## 🚀 Tech Stack

* Playwright
* TypeScript
* Node.js
* Git
* GitHub
* GitHub Actions
* REST API Testing
* dotenv
* HTML Reporting

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
├── helpers/
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

| Layer                | Responsibility                                 |
| -------------------- | ---------------------------------------------- |
| `pages/`             | Page-specific locators and UI interactions     |
| `components/`        | Reusable UI components shared across pages     |
| `helpers/`           | Reusable business flows and test operations    |
| `fixtures/`          | Dependency injection and reusable test setup   |
| `api/clients/`       | API-specific request operations                |
| `api/types/`         | TypeScript contracts for API data              |
| `data/`              | Centralized JSON test data                     |
| `utils/`             | Shared utilities and environment configuration |
| `tests/`             | Test scenarios and assertions                  |
| `.github/workflows/` | Continuous Integration configuration           |

---

### Test Suite Organization

The test scenarios are organized by testing purpose:

| Suite | Responsibility |
|---|---|
| `tests/smoke/` | Critical-path tests for fast feedback |
| `tests/regression/` | Broader functional and end-to-end coverage |
| `tests/negative/` | Negative and edge-case scenarios |
| `tests/api/` | API-level validation |

The smoke suite contains a focused set of critical-path scenarios, while the regression suite provides broader functional coverage and end-to-end validation. Negative and API scenarios are maintained separately because they represent distinct testing concerns.

## ✅ Test Coverage

The automation suite currently covers both UI and API scenarios.

### UI Test Coverage

* Login
* Invalid login scenarios
* Add Product to Cart
* Cart Validation
* Checkout Information
* Checkout Overview
* Checkout Completion
* Return to Inventory
* End-to-end purchase workflow

### API Test Coverage

* Authentication request
* Valid authentication credentials
* Invalid authentication credentials
* HTTP status validation
* Response body validation
* Dynamic authentication token validation
* Data-driven API authentication scenarios

The UI automation uses **SauceDemo** as the application under test.

API automation uses **Restful Booker** as a separate legitimate API target.

---

## 🏗 Framework Design

The framework follows a layered automation architecture based on **Page Object Model, separation of concerns, dependency injection, reusable components, and data-driven testing**.

### Key Components

* **Page Object Model (POM)**

  Encapsulates page-specific locators and UI interactions.

* **Reusable Components**

  Encapsulates shared UI functionality that is not specific to a single page.

* **Reusable Helpers**

  Encapsulates reusable business flows and reduces duplication across test scenarios.

* **Reusable Fixtures**

  Provides centralized dependency injection for Page Objects, Components, and Helpers.

* **Centralized Test Data**

  Stores users, products, checkout information, authentication data, and validation data in dedicated JSON files.

* **Type-Safe Test Data Models**

  Uses TypeScript interfaces and types to provide structured and type-safe test data.

* **API Client Layer**

  Encapsulates API request operations separately from API test scenarios.

* **Environment-Based Configuration**

  Centralizes environment-specific URLs using environment variables rather than hardcoding them throughout the framework.

* **Separation of Concerns**

  Keeps test scenarios, UI interactions, reusable flows, components, API operations, fixtures, configuration, and test data in their appropriate layers.

* **Data-Driven Testing**

  Separates test data from test logic to make scenarios easier to maintain and extend.

* **Cross-Browser Testing**

  Supports Chromium, Firefox, and WebKit execution.

* **Failure Screenshots**

  Captures screenshots automatically when a test fails to assist with debugging.

* **HTML Reporting**

  Generates Playwright HTML reports for test execution results and failure investigation.

* **GitHub Actions CI**

  Integrates automated Playwright test execution into the development workflow.

---

## 🧩 Reusable Component Architecture

Shared UI behavior is extracted into reusable components.

For example, the application's shopping cart navigation is represented by:

```text
components/
└── Header.ts
```

The `Header` component owns shared header functionality such as opening the shopping cart.

This prevents page-specific objects such as `InventoryPage` from owning functionality that belongs to the application's shared navigation.

The resulting separation is:

```text
Header
└── Shared navigation
    └── openCart()

InventoryPage
└── Inventory-specific functionality

CartHelper
├── Header
└── CartPage
```

This improves reusability, maintainability, and separation of responsibilities.

---

## 🔌 API Testing

API testing was introduced as part of the advanced automation phase.

### API Investigation

Before implementing API automation against SauceDemo, the application's network traffic was investigated to identify a legitimate business API.

The investigation found:

* Successful login did not generate an application Fetch/XHR authentication request.
* Invalid login attempts generated a `POST` request to `submit.backtrace.io`.
* The Backtrace request was identified as third-party error-reporting telemetry rather than a SauceDemo authentication API.
* Inspection of the frontend JavaScript bundle showed the application's known test usernames and `secret_sauce` password.

Based on these findings, the Backtrace endpoint was intentionally excluded from API automation.

### Engineering Decision

SauceDemo remains the UI application under test.

API automation uses **Restful Booker** as a separate legitimate API target rather than automating third-party telemetry or misrepresenting it as a SauceDemo business API.

### API Authentication Validation

The authentication tests validate:

* HTTP status code
* Presence of the authentication token
* Token is not empty
* Expected response behavior for invalid credentials

The exact authentication token is not asserted because authentication tokens are dynamically generated and may change between requests.

---

## ⚙️ Environment-Based Configuration

Environment-specific configuration is centralized in:

```text
utils/config.ts
```

The framework uses environment variables for the UI and API base URLs:

```text
UI_BASE_URL=https://www.saucedemo.com/
API_BASE_URL=https://restful-booker.herokuapp.com
```

The local `.env` file is excluded from source control through `.gitignore`.

This allows configuration to be changed without modifying the test code.

### CI Configuration

GitHub Actions provides the required environment variables through the workflow configuration so that CI does not depend on a locally stored `.env` file.

This keeps environment configuration separate from the automation implementation.

---

## 📊 Reporting

The framework uses Playwright's HTML reporter.

Run:

```bash
npx playwright show-report
```

Failure screenshots are enabled using:

```typescript
screenshot: 'only-on-failure'
```

This provides useful visual evidence when tests fail while avoiding unnecessary screenshots for successful tests.

Tracing is also configured to run on the first retry:

```typescript
trace: 'on-first-retry'
```

---

## 🌐 Cross-Browser Testing

The framework supports the following Playwright browser projects:

* Chromium
* Firefox
* WebKit

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

1. Checks out the repository
2. Sets up Node.js
3. Installs project dependencies
4. Installs Playwright browsers
5. Configures required environment variables
6. Executes the Playwright test suite
7. Uploads the Playwright HTML report as an artifact

This provides an additional validation layer whenever changes are pushed to the repository or submitted through a pull request.

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

* [x] Login
* [x] Inventory
* [x] Cart
* [x] Checkout
* [x] Checkout Overview
* [x] Checkout Complete
* [x] Page Object Model
* [x] Reusable Fixtures
* [x] Centralized Test Data
* [x] GitHub Actions Integration

### ✅ Phase 2 — Framework Refactoring

* [x] `beforeEach` Hooks
* [x] Centralization of Reusable Helpers
* [x] Checkout Flow Abstraction
* [x] Implementation of TypeScript Data Types
* [x] Reduction of Duplicate Code
* [x] Separation of Test Responsibilities
* [x] Type-Safe Test Data Models

### ✅ Phase 3 — Advanced Automation

* [x] Negative and Edge-Case Scenarios
* [x] Advanced Data-Driven Testing
* [x] API Testing Investigation
* [x] API Testing Implementation
* [x] Environment-Based Configuration
* [x] Reporting Enhancements
* [x] Cross-Browser Test Execution
* [x] Additional Reusable Components

---

## 📝 Engineering Decisions

### Why use Page Objects?

Page Objects isolate page-specific UI interactions from test scenarios, making the framework easier to maintain when locators or page behavior change.

### Why use Helpers?

Helpers encapsulate reusable business flows so that test specifications can focus on describing the scenario rather than implementing every individual interaction.

### Why use Fixtures?

Fixtures provide centralized dependency injection for Page Objects, Components, and Helpers, reducing repetitive setup code across tests.

### Why use Data-Driven Testing?

Test data is separated from test logic, making it easier to add new scenarios without duplicating test implementation.

### Why use API Testing alongside UI Testing?

API tests provide faster and more focused validation of backend behavior, while UI tests validate the complete user-facing workflow. Using both layers improves coverage and helps isolate failures more effectively.

### Why use a separate API target?

The SauceDemo investigation did not identify a legitimate business authentication API. The observed Backtrace request was third-party telemetry, so Restful Booker was selected as a legitimate API target for demonstrating API automation.

### Why use Environment-Based Configuration?

Environment variables prevent environment-specific URLs from being hardcoded throughout the framework and allow local and CI environments to use different configuration values.

### Why create a reusable Header component?

The shopping cart navigation belongs to the application's shared header rather than specifically to the inventory page. Moving this functionality into a reusable `Header` component reduces coupling and improves separation of concerns.

### Why separate Smoke and Regression suites?

The test suite is organized by testing purpose rather than application feature alone.

Smoke tests provide a focused set of critical-path checks that can be executed quickly to determine whether the application is stable enough for further testing.

Regression tests provide broader functional and end-to-end coverage to validate existing functionality after changes.

This separation allows the framework to provide fast feedback through smoke testing while retaining comprehensive regression coverage.

---

## 📈 Current Validation

The framework has been validated through:

* TypeScript compilation
* Local Playwright execution
* Chromium execution
* Firefox execution
* WebKit execution
* Full test suite execution
* GitHub Actions CI execution

The current full suite contains **30 tests**, with the latest local and GitHub Actions CI runs passing successfully.

---

## 👨‍💻 Author

Developed by **Rex Melvin Villaruel** using Playwright and TypeScript as a portfolio project focused on modern UI and API test automation, scalable framework design, cross-browser testing, CI/CD, and continuous improvement in test automation engineering.
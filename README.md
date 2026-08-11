# Playwright E-Commerce Automation Framework

## 📌 Project Overview

This project is an end-to-end UI automation framework built with Playwright and TypeScript.

It automates the complete purchase flow of the Sauce Demo application using the Page Object Model (POM), reusable helpers, custom fixtures, centralized test data, type-safe data models, and GitHub Actions for Continuous Integration (CI).

---

## Purpose

This project was built to strengthen my expertise in Playwright and modern test automation framework design.

While I have prior experience with tools such as Selenium, WebdriverIO, UFT, Appium, Karate Framework, and TOSCA, this repository focuses on applying Playwright and TypeScript using clean architecture, Page Object Model (POM), reusable helpers, fixtures, centralized test data, type-safe models, and CI/CD practices.

The framework is designed with separation of concerns in mind, keeping UI interactions, reusable business flows, test data, and test scenarios organized into dedicated layers.

---

## 🚀 Tech Stack

- Playwright
- TypeScript
- Node.js
- Git
- GitHub Actions

---

## 📁 Project Structure

```text
playwright-ecommerce-framework/
│
├── .github/
│   └── workflows/
├── api/
├── data/
├── fixtures/
├── helpers/
├── pages/
├── tests/
├── types/
├── utils/
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

### Framework Layers

| Layer | Responsibility |
|---|---|
| `pages/` | Page-specific locators and UI interactions |
| `helpers/` | Reusable business flows and test operations |
| `fixtures/` | Dependency injection and reusable test setup |
| `data/` | Centralized JSON test data |
| `types/` | TypeScript contracts for structured test data |
| `tests/` | Test scenarios and test assertions |
| `.github/workflows/` | Continuous Integration configuration |

---

## ✅ Test Coverage

The current automation suite covers the complete purchase workflow:

- Login
- Add Product to Cart
- Cart Validation
- Checkout Information
- Checkout Overview
- Checkout Completion
- Return to Inventory

The framework currently validates the complete happy-path purchase journey using the Sauce Labs Backpack test product.

---

## 🏗 Framework Design

The framework follows a layered automation architecture based on the Page Object Model and separation of concerns.

### Key Components

- **Page Object Model (POM)**  
  Encapsulates page-specific locators and UI interactions.

- **Reusable Helpers**  
  Encapsulates reusable business flows and reduces duplication across test scenarios.

- **Reusable Fixtures**  
  Provides centralized dependency injection for Page Objects and Helpers.

- **Centralized Test Data**  
  Stores users, products, checkout information, and validation messages in dedicated JSON files.

- **Type-Safe Test Data Models**  
  Uses TypeScript interfaces/types to provide structured and type-safe test data.

- **Separation of Concerns**  
  Keeps test scenarios, UI interactions, reusable flows, fixtures, and test data in their appropriate layers.

- **Smoke Test Suite**  
  Covers the primary end-to-end purchase workflow.

- **GitHub Actions CI**  
  Integrates automated Playwright test execution into the development workflow.

### Helper Architecture

The current helper layer includes:

```text
helpers/
├── authHelper.ts
├── inventoryHelper.ts
├── cartHelper.ts
├── checkoutHelper.ts
└── checkoutOverviewHelper.ts
```

Each helper is responsible for a specific area of the application flow, allowing test specifications to remain focused on describing the scenario rather than implementing every individual interaction.

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## ▶️ Running Tests

Run all tests:

```bash
npx playwright test
```

Run a single test:

```bash
npx playwright test tests/smoke/login.spec.ts
```

Run in headed mode:

```bash
npx playwright test --headed
```

Run in debug mode:

```bash
npx playwright test --debug
```

Open the HTML report:

```bash
npx playwright show-report
```

---

## 🤖 Continuous Integration

GitHub Actions is configured to execute the Playwright test suite as part of the CI workflow.

This allows automated test execution to be integrated into the repository's development workflow and provides an additional validation layer for changes.

---

## 📅 Roadmap

### ✅ Phase 1 — Core Framework Implementation

- Login
- Inventory
- Cart
- Checkout
- Checkout Overview
- Checkout Complete
- Page Object Model
- Reusable Fixtures
- Centralized Test Data
- GitHub Actions Integration

### ✅ Phase 2 — Framework Refactoring

- `beforeEach` Hooks
- Centralization of Reusable Helpers
- Checkout Flow Abstraction
- Implementation of TypeScript Data Types
- Reduction of Duplicate Code
- Separation of Test Responsibilities
- Type-Safe Test Data Models

### 🔄 Phase 3 — Advanced Automation

- Negative and Edge-Case Scenarios
- Advanced Data-Driven Testing
- API Testing
- Environment-Based Configuration
- Reporting Enhancements
- Cross-Browser Test Execution
- Additional Reusable Components

---

## 👨‍💻 Author

Developed by Rex Melvin Villaruel using Playwright and TypeScript as a portfolio project focused on modern UI test automation, scalable framework design, and continuous upskilling in Playwright.
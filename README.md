# Playwright E-Commerce Automation Framework

## 📌 Project Overview

This project is an end-to-end UI automation framework built with Playwright and TypeScript.

It automates the complete purchase flow of the Sauce Demo application using the Page Object Model (POM), reusable fixtures, centralized test data, and GitHub Actions for Continuous Integration (CI).

---

## Purpose

This project was built to strengthen my expertise in Playwright and modern automation framework design. While I have prior experience with tools such as Selenium, WebdriverIO, UFT, Appium, Karate Framework and TOSCA, this repository focuses on applying Playwright and TypeScript using clean architecture, Page Object Model (POM), reusable helpers, fixtures, and CI/CD best practices.

---

## 🚀 Tech Stack

- Playwright
- TypeScript
- Node.js
- Git
- GitHub Actions

---

## 📁 Project Structure

```
playwright-ecommerce-framework/
│
├── data/
├── fixtures/
├── pages/
├── tests/
├── .github/
├── playwright.config.ts
└── README.md
```

---

## ✅ Test Coverage (Phase 1)

The current automation suite covers the complete purchase workflow:

- Login
- Add Product to Cart
- Cart Validation
- Checkout Information
- Checkout Overview
- Checkout Complete

---

## 🏗 Framework Design

The framework follows the Page Object Model (POM) design pattern.

Key components include:

- Page Object Model
- Reusable Fixtures
- JSON Test Data
- Smoke Test Suite
- GitHub Actions CI

---

## ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

## ▶️ Running Tests

Run all tests

```bash
npx playwright test
```

Run a single test

```bash
npx playwright test tests/smoke/login.spec.ts
```

Run in headed mode

```bash
npx playwright test --headed
```

Run in debug mode

```bash
npx playwright test --debug
```

Open HTML report

```bash
npx playwright show-report
```

---

## 🤖 Continuous Integration

GitHub Actions automatically runs the Playwright test suite on every push to the repository.

---

## 📅 Roadmap

### ✅ Phase 1 (Completed)

- Login
- Inventory
- Cart
- Checkout
- Checkout Overview
- Checkout Complete
- GitHub Actions Integration

### 🔄 Phase 2 (In Progress)

- Framework Refactoring
- beforeEach Hooks
- Helper Methods
- Reduce Duplicate Code

### 📌 Future Enhancements

- Negative Test Scenarios
- Data-Driven Testing
- API Testing
- Environment Configuration
- Reporting Enhancements
- Cross-browser Improvements

---

## 👨‍💻 Author

Developed by Rex Melvin Villaruel using Playwright and TypeScript as a portfolio project focused on modern UI test automation, scalable framework design, and continuous upskilling in Playwright.
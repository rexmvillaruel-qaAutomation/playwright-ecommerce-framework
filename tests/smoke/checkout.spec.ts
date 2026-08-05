import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';

// Common Setup
test.beforeEach(async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
// Login
  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );
// Inventory
  await inventoryPage.verifyLoaded();
   });

// Test Scenario:

   test('Complete checkout information and continue', async ({ inventoryPage, cartPage, checkoutPage }) => {

// Inventory    
   await inventoryPage.addBackpackToCart();
   await inventoryPage.verifyCartBadge(
    products.backpack.cartbadgeCount
    );
   await inventoryPage.openCart();
   
// Cart
   await cartPage.verifyCartItemVisible();
   await cartPage.clickCheckout();

// Checkout 
   await checkoutPage.fillCheckoutInformation(
    users.standardUser.firstName,
    users.standardUser.lastName,
    users.standardUser.postalCode
  );
   await checkoutPage.continueCheckout();

});
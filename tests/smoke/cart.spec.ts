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

   test('Verify added item appears in cart', async ({ inventoryPage, cartPage }) => {
 
// Inventory    
   await inventoryPage.addBackpackToCart();
   await inventoryPage.verifyCartBadge(
    products.backpack.cartbadgeCount
    );
   await inventoryPage.openCart();
   
// Cart
   await cartPage.verifyCartItemVisible();
  });
  

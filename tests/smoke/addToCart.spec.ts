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
  test('Add backpack to cart', async ({ inventoryPage }) => {
// Inventory
   await inventoryPage.addBackpackToCart();
   await inventoryPage.verifyCartBadge(
    products.backpack.cartbadgeCount
       );

   });

  

  

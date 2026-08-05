import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';


// Common Setup
test.beforeEach(async ({ authHelper }) => {
// Login
  await authHelper.loginAs(
    users.standardUser.username,
    users.standardUser.password
      );
   });

// Test Scenario:
  test('Add backpack to cart', async ({ inventoryPage }) => {
// Inventory
   await inventoryPage.addBackpackToCart();
   await inventoryPage.verifyCartBadge(
    products.backpack.cartbadgeCount
       );

   });

  

  

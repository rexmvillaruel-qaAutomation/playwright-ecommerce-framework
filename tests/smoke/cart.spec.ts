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

   test('Verify added item appears in cart', async ({ inventoryPage, cartPage }) => {
 
// Inventory    
   await inventoryPage.addProductToCart(products.backpack);
   await inventoryPage.verifyCartBadge(
    products.backpack.cartbadgeCount
    );
   await inventoryPage.openCart();
// Cart
   await cartPage.verifyCartItemVisible();
  });
  

import { test } from '../../fixtures/baseFixture';
import messages from '../../data/messages.json';
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

   test('Complete checkout information and continue', async (
    { inventoryHelper, cartHelper, checkoutHelper, checkoutOverviewPage  }) => {

// Inventory    
    await inventoryHelper.addProductToCart(
      products.backpack
      );
      
// Cart
   await cartHelper.openCart();
   await cartHelper.verifyAddedProduct();

// Checkout 
   await checkoutHelper.proceedToCheckout(
      users.standardUser.firstName,
      users.standardUser.lastName,
      users.standardUser.postalCode
   );

// Checkout Overview
   await checkoutOverviewPage.verifyPageLoaded(
      messages.overview.title
   );
});
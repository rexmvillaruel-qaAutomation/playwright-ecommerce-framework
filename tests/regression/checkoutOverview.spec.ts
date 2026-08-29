import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';
import checkout from '../../data/checkout.json';
import messages from '../../data/messages.json';

// Common Setup
test.beforeEach(async ({ authHelper }) => {
// Login
  await authHelper.loginAs(
    users.standardUser.username,
    users.standardUser.password
      );
   });

// Test Scenario:

   test('Verify checkout overview information', async ({ 
    cartHelper, checkoutHelper, 
    inventoryHelper, checkoutOverviewHelper }) => {

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
  await checkoutOverviewHelper.verifyOverview(
     messages.overview.title, 
     products.backpack, 
     checkout.orderSummary);
 
});
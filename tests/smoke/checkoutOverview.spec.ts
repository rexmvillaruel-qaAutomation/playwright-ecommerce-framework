import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';
import checkout from '../../data/checkout.json';
import messages from '../../data/messages.json'

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
    checkoutOverviewPage, inventoryHelper }) => {

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
  await checkoutOverviewPage.verifyProductDetails(
    
    products.backpack.name,
    products.backpack.quantity,
    products.backpack.price

  );
  await checkoutOverviewPage.verifyOrderSummary(
    
    checkout.orderSummary.paymentInformation,
    checkout.orderSummary.shippingInformation,
    checkout.orderSummary.itemTotal,
    checkout.orderSummary.tax,
    checkout.orderSummary.total

  );
  
});
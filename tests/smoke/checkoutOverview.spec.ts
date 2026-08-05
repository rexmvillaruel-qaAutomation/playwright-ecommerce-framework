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
    inventoryPage, cartPage, checkoutPage, 
    checkoutOverviewPage }) => {

// Inventory    
   await inventoryPage.addProductToCart(products.backpack);
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
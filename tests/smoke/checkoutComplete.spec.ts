import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';
import checkout from '../../data/checkout.json';
import messages from '../../data/messages.json'

test('Complete checkout information', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
  checkoutOverviewPage,
  checkoutCompletePage,

}) => {
  await loginPage.goto();

//Login 
  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );
//Inventory 
  await inventoryPage.verifyLoaded();
  await inventoryPage.addBackpackToCart();
  await inventoryPage.verifyCartBadge(
    products.backpack.cartbadgeCount
  );
  await inventoryPage.openCart();
//Cart 
  await cartPage.verifyCartItemVisible();
  await cartPage.clickCheckout();
//Checkout 
  await checkoutPage.fillCheckoutInformation(
    users.standardUser.firstName,
    users.standardUser.lastName,
    users.standardUser.postalCode
  );
  await checkoutPage.continueCheckout();
//Checkout Overview 
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
  await checkoutOverviewPage.completeCheckout();

//Completed Checkout
  await checkoutCompletePage.verifyLoaded (
    messages.complete.title
  );
  await checkoutCompletePage.verifyMessages (
    messages.complete.header,
    messages.complete.message
  );
  await checkoutCompletePage.verifyActionButtons ();

//Back to Inventory
  await checkoutCompletePage.clickBackHome()
  await inventoryPage.verifyLoaded();

});
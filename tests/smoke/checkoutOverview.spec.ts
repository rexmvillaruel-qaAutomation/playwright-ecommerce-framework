import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';

test('Complete checkout information', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
  checkoutOverviewPage,

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
  await checkoutOverviewPage.verifyPageLoaded();
  await checkoutOverviewPage.verifyProductDetails(
    
    products.backpack.name,
    products.backpack.quantity,
    products.backpack.price

  );
  await checkoutOverviewPage.verifyOrderSummary(
    
    products.orderSummary.paymentInformation,
    products.orderSummary.shippingInformation,
    products.orderSummary.itemTotal,
    products.orderSummary.tax,
    products.orderSummary.total

  );
  await checkoutOverviewPage.completeCheckout();

});
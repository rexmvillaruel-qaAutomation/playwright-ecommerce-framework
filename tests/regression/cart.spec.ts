
import { expect, test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';

// Common Setup
test.beforeEach(async ({ authHelper }) => {
  await authHelper.loginAs(
    users.standardUser.username,
    users.standardUser.password
  );
});

// Test Scenario
test('Verify added item appears in cart', async ({
  inventoryHelper,
  cartHelper,
  cartPage,
}) => {
  // Add product to cart
  await inventoryHelper.addProductToCart(products.backpack);

  // Open cart
  await cartHelper.openCart();

  // Validate cart item
  await expect(cartPage.cartItem).toHaveCount(1);
  await expect(cartPage.cartItem.first()).toBeVisible();
});
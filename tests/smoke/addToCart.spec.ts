
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
test('Add product to cart', async ({ inventoryHelper, inventoryPage }) => {
  await inventoryHelper.addProductToCart(products.backpack);

  // Validate cart badge
  await expect(inventoryPage.cartBadge).toHaveText(
    products.backpack.cartbadgeCount
  );
});

import { expect, test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';

test('Add product to cart', async ({
  loginPage,
  inventoryPage,
}) => {
  // Arrange: Log in as a standard user
  await loginPage.goto();
  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );

  // Act: Add the backpack to the cart
  await inventoryPage.addProductToCart(products.backpack);

  // Assert: Verify the cart badge count
  await expect(inventoryPage.cartBadge).toHaveText(
    products.backpack.cartbadgeCount
  );
});
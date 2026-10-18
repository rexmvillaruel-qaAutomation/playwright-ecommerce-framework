
import { expect, test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';

test('Verify added item appears in cart', async ({
  loginPage,
  inventoryPage,
  header,
  cartPage,
}) => {
  // Arrange: Log in as a standard user
  await loginPage.goto();
  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );

  // Act: Add the backpack and open the cart
  await inventoryPage.addProductToCart(products.backpack);
  await header.openCart();

  // Assert: Verify the cart contains exactly one visible item
  await expect(cartPage.cartItem).toHaveCount(1);
  await expect(cartPage.cartItem.first()).toBeVisible();
});
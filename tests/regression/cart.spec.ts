
import { expect, test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';
import { withDecryptedPassword } from '../../utils/credentials';

test('Verify added item appears in cart', async ({
  loginPage,
  inventoryPage,
  header,
  cartPage,
}) => {

  // Decrypt the standard user's password before authentication.
  const standardUser = withDecryptedPassword(users.standardUser);

  // Arrange: Log in as a standard user
  await loginPage.goto();
  await loginPage.login(
      standardUser.username,
      standardUser.password
  );

  // Act: Add the backpack and open the cart
  await inventoryPage.addProductToCart(products.backpack);
  await header.openCart();

  // Assert: Verify the cart contains exactly one visible item
  await expect(cartPage.cartItem).toHaveCount(1);
  await expect(cartPage.cartItem.first()).toBeVisible();
});
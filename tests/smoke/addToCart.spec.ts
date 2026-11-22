
import { expect, test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';
import { withDecryptedPassword } from '../../utils/credentials';

test('Add product to cart', async ({
  loginPage,
  inventoryPage,
}) => {


  // Decrypt the standard user's password before authentication.
  const standardUser = withDecryptedPassword(users.standardUser);

  // Arrange: Log in as a standard user
  await loginPage.goto();
  await loginPage.login(
      standardUser.username,
      standardUser.password
  );

  // Act: Add the backpack to the cart
  await inventoryPage.addProductToCart(products.backpack);

  // Assert: Verify the cart badge count
  await expect(inventoryPage.cartBadge).toHaveText(
    products.backpack.cartbadgeCount
  );
});
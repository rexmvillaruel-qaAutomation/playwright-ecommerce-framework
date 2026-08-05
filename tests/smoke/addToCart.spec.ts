import { test } from '../../fixtures/baseFixture';
import users from '../../data/users.json';
import products from '../../data/products.json';


// Common Setup
test.beforeEach(async ({ authHelper }) => {
// Login
  await authHelper.loginAs(
    users.standardUser.username,
    users.standardUser.password
      );
   });

// Test Scenario:
  test('Add product to cart', async ({ inventoryHelper }) => {

// Inventory
    await inventoryHelper.addProductToCart(
      products.backpack
      );

   });

  

  

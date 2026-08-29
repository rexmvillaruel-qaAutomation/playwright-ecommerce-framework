import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { AuthHelper } from '../helpers/authHelper';
import { InventoryHelper } from '../helpers/inventoryHelper';
import { CartHelper } from '../helpers/cartHelper';
import { CheckoutHelper } from '../helpers/checkoutHelper';
import { CheckoutOverviewHelper } from '../helpers/checkoutOverviewHelper';
import { Header } from '../components/Header';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  header: Header;
  authHelper: AuthHelper;
  inventoryHelper: InventoryHelper;
  cartHelper: CartHelper;
  checkoutHelper: CheckoutHelper;
  checkoutOverviewHelper: CheckoutOverviewHelper;

};

// Pages:
const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));

  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  
  header: async ({ page }, use) => {
  await use(new Header(page));
  },

  // Helpers:
  authHelper: async (
    { loginPage, inventoryPage },
    use ) => {
    await use(new AuthHelper(loginPage, inventoryPage));
    },

  inventoryHelper: async (
    { inventoryPage }, 
    use ) => {
    await use(new InventoryHelper( inventoryPage ));
    },
  
  cartHelper: async (
    { header, cartPage }, 
    use ) => {
    await use(new CartHelper( header, cartPage ));
    },

  checkoutHelper: async (
    {cartPage, checkoutPage},
    use ) => {
      await use(new CheckoutHelper( cartPage, checkoutPage));
    },
   
  checkoutOverviewHelper: async (
    { checkoutOverviewPage },
   use ) => {
      await use(new CheckoutOverviewHelper(checkoutOverviewPage));
    },
  
});

export { test };
export { expect } from '@playwright/test';

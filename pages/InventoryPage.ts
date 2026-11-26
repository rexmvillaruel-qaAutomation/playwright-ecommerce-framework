
import { Locator, Page } from '@playwright/test';
import { ProductDetails } from '../types/product';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryTitle: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {

    this.page = page;
    this.inventoryTitle = page.getByText('Products', {
      exact: true,
    })
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

    productAddToCartButton(productDetails: ProductDetails): Locator {
      const productCard = this.page.locator('.inventory_item').filter({
        has: this.page.getByText(productDetails.name, { exact: true }),
      });

      return productCard.getByRole('button', {
        name: 'Add to cart',
        exact: true,
      });
    }
  
  async addProductToCart(productDetails: ProductDetails): Promise<void> {
    await this.productAddToCartButton(productDetails).click();
  }
}
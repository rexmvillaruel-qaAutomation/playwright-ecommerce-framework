
import { Header } from '../components/Header';
import { CartPage } from '../pages/CartPage';

export class CartHelper {
  readonly header: Header;
  readonly cartPage: CartPage;

  constructor(header: Header, cartPage: CartPage) {
    this.header = header;
    this.cartPage = cartPage;
  }

  async openCart() {
    await this.header.openCart();
  }
}
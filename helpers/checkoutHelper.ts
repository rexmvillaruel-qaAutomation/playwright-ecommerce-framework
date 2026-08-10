import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export class CheckoutHelper {

    readonly cartPage: CartPage;
    readonly checkoutPage: CheckoutPage;

    constructor(cartPage: CartPage, checkoutPage: CheckoutPage) {
            this.cartPage = cartPage;
            this.checkoutPage = checkoutPage;  
        }

    async proceedToCheckout(
        firstName: string,
        lastName: string,
        postalCode: string ) {

            await this.cartPage.clickCheckout();
            await this.checkoutPage.fillCheckoutInformation(
                firstName, 
                lastName, 
                postalCode);
            await this.checkoutPage.continueCheckout();

        } 
    }


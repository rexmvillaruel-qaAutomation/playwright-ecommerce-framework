import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { ProductDetails } from '../types/product';
import { OrderSummary } from '../types/orderSummary';

export class CheckoutOverviewHelper {

    readonly checkoutOverviewPage: CheckoutOverviewPage;

    constructor(checkoutOverviewPage: CheckoutOverviewPage) {
        this.checkoutOverviewPage = checkoutOverviewPage;
    }
        async verifyOverview(
            expectedTitle: string,
            product: ProductDetails,
            orderSummary: OrderSummary
        ) {
            
            await this.checkoutOverviewPage.verifyPageLoaded(expectedTitle);

            await this.checkoutOverviewPage.verifyProductDetails(
                
                product.name,
                product.quantity,
                product.price
            );

            await this.checkoutOverviewPage.verifyOrderSummary(
                
                orderSummary.paymentInformation,
                orderSummary.shippingInformation,
                orderSummary.itemTotal,
                orderSummary.tax,
                orderSummary.total
            );
    }
}
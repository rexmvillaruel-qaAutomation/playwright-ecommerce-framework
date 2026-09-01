
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetails } from '../types/product';
    
    export class InventoryHelper {
        
       readonly inventoryPage: InventoryPage;

        constructor(inventoryPage: InventoryPage) {
            this.inventoryPage = inventoryPage;
        }
    async addProductToCart(productDetails: ProductDetails) {
        await this.inventoryPage.addProductToCart(productDetails);
        await this.inventoryPage.verifyCartBadge(
        productDetails.cartbadgeCount
        );
    }
}
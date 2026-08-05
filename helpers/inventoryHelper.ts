
import { InventoryPage } from '../pages/InventoryPage';
    
    export class InventoryHelper {
        
       readonly inventoryPage: InventoryPage;

        constructor(inventoryPage: InventoryPage) {
            this.inventoryPage = inventoryPage;
        }
    async addProductToCart (productDetails: any){
        
         await this.inventoryPage.addProductToCart(productDetails);   
         await this.inventoryPage.verifyCartBadge(
            productDetails.cartbadgeCount);
        }      
    }
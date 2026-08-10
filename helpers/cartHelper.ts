import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

 export class CartHelper {
        
       readonly inventoryPage: InventoryPage;
       readonly cartPage: CartPage;

        constructor(inventoryPage: InventoryPage, cartPage: CartPage) {
            this.inventoryPage = inventoryPage;
            this.cartPage = cartPage;
        }
    async verifyAddedProduct (){
        
         await this.inventoryPage.openCart();   
         await this.cartPage.verifyCartItemVisible();
        }      
    }
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

export class AuthHelper {

    readonly loginPage: LoginPage;
    readonly inventoryPage: InventoryPage;

    constructor(loginPage: LoginPage, inventoryPage: InventoryPage ) {

        this.loginPage = loginPage;
        this.inventoryPage = inventoryPage;
    }

    async loginAs(
        username: string,
        password: string
    ) {
        await this.loginPage.goto();
        await this.loginPage.login(username, password);
        await this.inventoryPage.verifyLoaded();
    }

}

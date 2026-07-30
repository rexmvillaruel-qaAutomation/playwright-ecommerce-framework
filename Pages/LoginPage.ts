import { Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;

    readonly usernameInput: string;
    readonly passwordInput: string;
    readonly loginButton: string;

    constructor(page: Page) {

        this.page = page;

        this.usernameInput = '#user-name';

        this.passwordInput = '#password';

        this.loginButton = '#login-button';

    }

    async goto() {

        await this.page.goto(
            'https://www.saucedemo.com/'
        );

    }

    async login(
        username: string,
        password: string
    ) {

        await this.page.fill(
            this.usernameInput,
            username
        );


        await this.page.fill(
            this.passwordInput,
            password
        );


        await this.page.click(
            this.loginButton
        );

    }

}
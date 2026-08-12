import { Locator, Page, expect } from '@playwright/test';


export class LoginPage {

    readonly page: Page;

    readonly usernameInput: string;
    readonly passwordInput: string;
    readonly loginButton: string;
    readonly errorMessage: Locator;

    constructor(page: Page) {

        this.page = page;
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';

        this.errorMessage = page.locator('[data-test="error"]');

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
     async verifyLoginError(expectedMessage: string) {
      await expect(this.errorMessage).toHaveText(expectedMessage);
        }

    }
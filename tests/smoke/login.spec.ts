import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../data/users.json';

test('Valid user login', async ({ page }) => {


    const loginPage = new LoginPage(page);


await loginPage.goto();

await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
);

    await expect(page)
        .toHaveURL(/inventory/);


});

import { LoginPage } from '../pages/LoginPage';

export class AuthHelper {
  readonly loginPage: LoginPage;

  constructor(loginPage: LoginPage) {
    this.loginPage = loginPage;
  }

  async loginAs(username: string, password: string) {
    await this.loginPage.goto();
    await this.loginPage.login(username, password);
  }
}
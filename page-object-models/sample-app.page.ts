import { BaseHelper } from "@helpers/base.helper";
import { Locator, Page } from "@playwright/test";

export class SampleAppPage extends BaseHelper {
  public readonly loginField: Locator;
  public readonly passwordField: Locator;
  public readonly loginButton: Locator;
  public readonly loginStatus: Locator;

  public constructor(page: Page) {
    super(page);
    this.loginField = page.getByPlaceholder("User Name");
    this.passwordField = page.locator('input[type="password"]');
    this.loginButton = page.locator('button[id="login"]');
    this.loginStatus = page.locator('label[id="loginstatus"]');
  }
 
    /**
   * Performs login actions.
   * @param {string} username - Specifies username.
   * @param {string} password - Specifies password.
   */
  public async login(username: string, password: string) {
    if (await this.loginField.isVisible()) {
      await this.loginField.click();
    }
    await this.loginField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

}
import { BaseHelper } from "@helpers/base.helper";
import { Locator, Page } from "@playwright/test";

export class TextInputPage extends BaseHelper {
  public readonly textField: Locator;

  public constructor(page: Page) {
    super(page);
    this.textField = page.getByPlaceholder("MyButton");
  }
  /**
   * Gets a locator for a AJAX Request triggering button
   */
  get buttonToChange(): Locator {
    return this.page.locator('button[id="updatingButton"]');
  }
}
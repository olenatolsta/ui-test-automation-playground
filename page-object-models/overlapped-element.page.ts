import { BaseHelper } from "@helpers/base.helper";
import { Locator, Page } from "@playwright/test";

export class OverlappedElementPage extends BaseHelper {
  public readonly idField: Locator;
  public readonly nameField: Locator;
  public readonly divToScroll: Locator;

  public constructor(page: Page) {
    super(page);
    this.idField = page.getByPlaceholder("Id");
    this.nameField = page.getByPlaceholder("Name");
    this.divToScroll = page.locator('div[style^="overflow-y"]');
  }

  // Fills in Id field 
  async inputId(id: string) {
    await this.idField.fill(id);
  }

  //Fills in Name field
  async inputName(name: string) {
    await this.divToScroll.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
    await this.nameField.fill(name);
  }
}

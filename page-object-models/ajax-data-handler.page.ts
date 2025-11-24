import { BaseHelper } from "@helpers/base.helper";
import { Locator, Page } from "@playwright/test";

export class AjaxDataPage extends BaseHelper {
  public readonly dataLoaded: Locator;

  public constructor(page: Page) {
    super(page);
    this.dataLoaded = page.locator(".bg-success");
  }
  /**
   * Gets a locator for a AJAX Request triggering button
   */
  get ajaxButton(): Locator {
    return this.page.locator('button[id="ajaxButton"]');
  }
}

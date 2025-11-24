import { BaseHelper } from "@helpers/base.helper";
import { Locator, Page } from "@playwright/test";

export class ProgressBarPage extends BaseHelper {
  public readonly startButton: Locator;
  public readonly stopButton: Locator;

  public constructor(page: Page) {
    super(page);
    this.startButton = page.locator('button[id="startButton"]');
    this.stopButton = page.locator('button[id="stopButton"]');
  }
  // Waits for a particular Progress Bar value or 15 seconds
  async waitForProgressBarValue() {
    await this.page.waitForFunction(
      () => {
        const el = document.querySelector('[role="progressbar"]');
        return el && Number(el.getAttribute("aria-valuenow")) >= 75;
      },
      { timeout: 15000 }
    );
  }
}

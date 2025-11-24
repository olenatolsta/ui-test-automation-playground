import { test as base, expect, Page } from "@playwright/test";
import environment from "@utilities/environment";
import { PageManager } from "@page-manager";

// --- types ---
export type TestFixtures = {
  openBaseUrl: Page;
  pageManager: PageManager;
  openAjaxPage: Page;
  openTextInputPage: Page;
  openSampleAppPage: Page;
  openDynamicTablePage: Page;
  openProgressBarPage: Page;
  openOverlappedElementPage: Page;
  openVisibilityPage: Page;
};

// --- define extended test ---
export const test = base.extend<TestFixtures>({
  openBaseUrl: [
    async ({ page }, use) => {
      await page.goto(environment.BASE_URL);
      await use(page);
    },
    //The base page will be opened before any test execution
    { auto: true },
  ],

  pageManager: async ({ page }, use) => {
    const manager = new PageManager(page);
    await use(manager);
  },

  /**
   * Navigates to AJAX data page
   */
  openAjaxPage: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await pageManager.openAjaxPage();
    await use(page);
  },

  openTextInputPage: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await pageManager.openTextInputPage();
    await use(page);
  },

  openSampleAppPage: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await pageManager.openSampleAppPage();
    await use(page);
  },
  openDynamicTablePage: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await pageManager.openDynamicTablePage();
    await use(page);
  },

  openProgressBarPage: async({page}, use) => {
    const pageManager = new PageManager(page);
    await pageManager.openProgressBarPage();
    await use(page);
  },

  openOverlappedElementPage: async({page}, use)=>{
    const pageManager = new PageManager(page);
    await pageManager.openOverlappedElementPage();
    await use(page);
  },

  openVisibilityPage: async({page}, use)=>{
    const pageManager = new PageManager(page);
    await pageManager.openVisibilityPage();
    await use(page);
  }
});

export { expect };

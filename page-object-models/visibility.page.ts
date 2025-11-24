import { BaseHelper } from "@helpers/base.helper";
import { Locator, Page, TestInfo } from "@playwright/test";

/**
 * Represents the visibility evaluation result for a UI element.
 * A union of all possible states
 * * 1) `{ state: "REMOVED" }`
 *    - The element is not present in the DOM at all.
 *    - No further visibility properties apply.
 *
 * 2) `{ state: "OK", ... }`
 *    - The element exists in the DOM and has been inspected.
 *    - Includes computed CSS values and layout metrics used to
 *      determine different visibility failure conditions such as:
 *        • display:none
 *        • visibility:hidden
 *        • opacity:0
 *        • zero-size dimensions
 *        • off-screen positioning
 *        • visual overlapping by another element
 * */
type VisibilityData =
  | { state: "REMOVED" }
  | {
      state: "OK";
      display: string;
      visibility: string;
      opacity: string;
      width: number;
      height: number;
      x: number;
      y: number;
      overlapped: boolean;
    };

export class VisibilityPage extends BaseHelper {
  public readonly primaryHideButton: Locator;

  private buttons = [
    'button[id="removedButton"]',
    'button[id="zeroWidthButton"]',
    'button[id="overlappedButton"]',
    'button[id="transparentButton"]',
    'button[id="invisibleButton"]',
    'button[id="notdisplayedButton"]',
    'button[id="offscreenButton"]',
  ];

  public constructor(page: Page) {
    super(page);
    this.primaryHideButton = page.locator('button[id="hideButton"]');
  }

  /**
   * Determines the visibility state of an element.
   *
   * @param selector - CSS selector for the target element
   * @returns VisibilityData - describing either REMOVED or full visibility metrics
   */
  private async getVisibilityState(selector: string): Promise<VisibilityData> {
    // Try to get a handle immediately — returns `null` if the element is NOT in the DOM
    const handle = await this.page.$(selector);

    // Case 1: element does not exist in DOM at all
    if (!handle) {
      return { state: "REMOVED" };
    }

    // Case 2: element exists — run code inside the browser context
    return await handle.evaluate((el) => {
      // Get computed CSS properties (display, visibility, opacity, etc.)
      const style = window.getComputedStyle(el);
      // Get layout information (size + position relative to viewport)
      const rect = el.getBoundingClientRect();

      return {
        state: "OK",

        // CSS visibility parameters
        display: style.display,             // e.g., "none"
        visibility: style.visibility,       // e.g., "hidden"
        opacity: style.opacity,             // e.g., "0"

        // Size — allows detecting zero-width/height cases
        width: rect.width,
        height: rect.height,

        // Position — used to determine off-screen elements
        x: rect.x,
        y: rect.y,

        // Detect whether something is covering the element
        overlapped: (() => {
          // Check the center point of the element
          const cx = rect.x + rect.width / 2;
          const cy = rect.y + rect.height / 2;

          // elementFromPoint returns the topmost element at that coordinate
          const top = document.elementFromPoint(cx, cy);

          // If the top element is not this element — it's overlapped
          return top && top !== el;
        })(),
      };
    });
  }

  /**
   * Runs visibility evaluation for all target buttons and returns
   * a list of issues found. If the result array is empty, all checks passed.
   *
   * @returns string[] list of detected visibility problems
   */
  public async runChecks(): Promise<string[]> {
    // Accumulates visibility failure messages
    const results: string[] = [];

    // Iterate through each tracked button selector
    for (const selector of this.buttons) {
      // Get visibility data for the current element
      const data = await this.getVisibilityState(selector);

      /* --- VISIBILITY CONDITIONS IN PRIORITY ORDER --- */

      // 1) Element is missing from DOM entirely
      if (data.state === "REMOVED") {
        results.push(`${selector} → REMOVED`);
        continue;
      }

      // 2) CSS display:none — element does not render and takes no space
      if (data.display === "none") {
        results.push(`${selector} → DISPLAY NONE`);
        continue;
      }

      // 3) visibility:hidden — still takes space but cannot be seen
      if (data.visibility === "hidden") {
        results.push(`${selector} → VISIBILITY HIDDEN`);
        continue;
      }

      // 4) opacity:0 — fully transparent but technically still interactable
      if (data.opacity === "0") {
        results.push(`${selector} → TRANSPARENT`);
        continue;
      }

      // 5) Zero width/height — rendered but collapsed to nothing
      if (data.width === 0 || data.height === 0) {
        results.push(`${selector} → ZERO SIZE`);
        continue;
      }

      // 6) Element positioned off-screen
      if (data.x < 0 || data.y < 0) {
        results.push(`${selector} → OFFSCREEN`);
        continue;
      }

      // 7) Something visually covers the element at its center point
      if (data.overlapped) {
        results.push(`${selector} → OVERLAPPED`);
        continue;
      }

      // If none of the above matched → element is considered visible
    }
    // Return only the failures — empty array means success
    return results;
  }

  /**
   * Attaches visibility result output into the Playwright test report.
   * Only attaches when issues are present — avoids noise on passing runs.
   *
   * @param testInfo Playwright's test context object
   * @param results list of visibility problems from runChecks()
   */
  async checkResults(testInfo: TestInfo, results: string[]) {
    // Only attach if there were failures — prevents empty report files
    if (results.length > 0) {
      await testInfo.attach("visibility-results", {
        body: results.join("\n"),           // one issue per line
        contentType: "text/plain",          // shows cleanly in test report UI
      });
    }
  }
}

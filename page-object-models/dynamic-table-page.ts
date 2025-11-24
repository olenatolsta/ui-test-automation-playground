import { BaseHelper } from "@helpers/base.helper";
import { Locator, Page } from "@playwright/test";

export class DynamicTablePage extends BaseHelper {
  public readonly yellowLabelValue: Locator;

  public constructor(page: Page) {
    super(page);
    this.yellowLabelValue = page.locator(".bg-warning");
  }

  /**
   * Returns the value of a given browser's characteristic from the "Tasks" table.
   *
   * @param characteristic  – the column name to search for (e.g. "CPU")
   * @param browser         – the row identifier to search for (e.g. "Chrome")
   */
  public async getCharacteristicValue(
    characteristic: string,
    browser: string
  ): Promise<string> {
    // Locates the table (in case there's more than one on the page)
    const table = this.page.getByRole("table", { name: "Tasks" });

    // Gets all header cells and finds index of characteristic
    const headers = table.getByRole("columnheader");
    const headerTexts = await headers.allInnerTexts();

    // In case specified column is missing, the index remains -1
    let charIndex = -1;
    let index = 0;

    // Searches for characteristic value among the browsers' characteristics/headers
    // Using for of loop
    for (const header of headerTexts) {
      if (header === characteristic) {
        charIndex = index;
        break;
      }
      index++;
    }
    if (charIndex === -1) {
      throw new Error(`Column "${characteristic}" not found`);
    }

    // Finds a row that contains a browser
    const rows = table.getByRole("row");
    const rowCount = await rows.count();

    // In case specified column is missing, the index remains -1
    let browserRowIndex = -1;
    // Using for loop
    for (let i = 0; i < rowCount; i++) {
      const rowText = await rows.nth(i).innerText();
      if (rowText.includes(browser)) {
        browserRowIndex = i;
        break;
      }
    }

    if (browserRowIndex === -1) {
      throw new Error(`Row "${browser}" not found`);
    }

    // Gets the cell at the CPU index
    const browserRow = rows.nth(browserRowIndex);
    const charCell = browserRow.getByRole("cell").nth(charIndex);

    const charValue = await charCell.innerText();

    return charValue;
  }

  async getYellowLabelValue(): Promise<string> {
    // Gets a text from yellow label
    const rawData = await this.yellowLabelValue.innerText();
    // Extracts a number with percent symbol from the text in order to compare later
    return rawData.replace(/^.*?(\d+(\.\d+)?%)$/, "$1");
  }
}

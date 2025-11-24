import { test, expect } from "@fixtures/fixtures";
import * as Data from "@helpers/test-data.helper";

test(
  "OTTest-004 CPU load for Chrome should match the value from yellow line",
  { tag: "@smoke @OTTest-004" },
  async ({ pageManager, openDynamicTablePage }) => {
    openDynamicTablePage;

    const yellowLabelValue = await pageManager
      .onDynamicTablePage()
      .getYellowLabelValue();
    const chars = await pageManager
      .onDynamicTablePage()
      .getCharacteristicValue(
        Data.valuesForSearch.characteristic,
        Data.valuesForSearch.browser
      );
    // Compares the value of a found browser characteristic to the one in summary yellow field
    await expect(yellowLabelValue).toEqual(chars);
  }
);

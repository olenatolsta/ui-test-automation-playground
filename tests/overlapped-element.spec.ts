import { test, expect } from "@fixtures/fixtures";
import * as Data from "@helpers/test-data.helper";

test(
  "OTTest-006 Scrolls the page in order to input the setting text into text field. The text should be entered correctly.",
  { tag: "@smoke @OTTest-006" },
  async ({ pageManager, openOverlappedElementPage }) => {
    openOverlappedElementPage;

    // Playwright does scrolling silently in the background, so the test passes even with a simple fill()
    await pageManager.onOverlappedElementPage().inputId(Data.settings.id);

    // Additional scrolling is added
    await pageManager.onOverlappedElementPage().inputName(Data.settings.name);

    // Make sure the field contains the expected text
    await expect(pageManager.onOverlappedElementPage().nameField).toHaveValue(
      Data.settings.name
    );
  }
);

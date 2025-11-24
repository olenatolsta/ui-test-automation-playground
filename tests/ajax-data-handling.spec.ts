import { test, expect } from "@fixtures/fixtures";

test(
  "OTTest-001 Waiting for AJAX data to be handled. Should return text with a specific background",
  { tag: "@smoke @OTTest-001" },
  async ({ pageManager, openAjaxPage }) => {
    openAjaxPage;

    await pageManager.onAjaxPage().ajaxButton.click();
    //Make sure the element appears on the page
    await expect(pageManager.onAjaxPage().dataLoaded).toHaveText(
      "Data loaded with AJAX get request.",
      { timeout: 16000 }
    );
    //Make sure the element has a specific color background
    await expect(pageManager.onAjaxPage().dataLoaded).toHaveCSS(
      "background-color",
      "rgb(40, 167, 69)"
    );
  }
);

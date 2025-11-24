import { test } from "@fixtures/fixtures";

test(
  "OTTest-005 Starts a progress in Progress Bar, waits for an expected value and stops the progress",
  { tag: "@smoke @OTTest-005" },
  async ({ pageManager, openProgressBarPage }) => {
    openProgressBarPage;

    await pageManager.onProgressBarPage().startButton.click();
    await pageManager.onProgressBarPage().waitForProgressBarValue();
    await pageManager.onProgressBarPage().stopButton.click();
  });

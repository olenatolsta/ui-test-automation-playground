import { test, expect } from "@fixtures/fixtures";

/**
 * This is an example of parametrized test.
 * The test runs for both cases: with and without clicking a Hide button.
 * 
 * 1) In case of not clicking the Hide button, all verifications are executed anyway. Expected result will be to have an empty array of errors -
 * all the buttons are visible and test passes.
 * 
 * 2) In case of clicking the Hide button, all the verifications should fail and results are pushed to the resulted error. The test fails.
 * 
 * Results of test execution as a log of resulting array are attached to Test Report.
 * */

const cases = [
  {
    name: "Running the test without clicking a Primary Hide button",
    click: false,
  },
  { name: "Running the test with clicking a Primary Hide button", click: true },
];

test.describe("Checking if element is visible on screen. Should determine if buttons are visible.", () => {
  for (const scenario of cases) {
    test(
      `OTTest-007 (${scenario.name})`,
      { tag: "@smoke @OTTest-007" },
      async ({ pageManager, openVisibilityPage }, testInfo) => {
        openVisibilityPage;

        if (scenario.click) {
          // Hits primary button to hide the buttons
          await pageManager.onVisibilityPage().primaryHideButton.click();
        }

        // Fills in the array with results of test execution
        const results = await pageManager.onVisibilityPage().runChecks();
        await pageManager.onVisibilityPage().checkResults(testInfo, results);

        expect(results).toHaveLength(0);
      }
    );
  }
});

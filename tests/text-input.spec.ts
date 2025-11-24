import { test, expect } from "@fixtures/fixtures";

test(
  "OTTest-002 Inputting text into text field. Should change button name",
  { tag: "@smoke @OTTest-002" },
  async ({ pageManager, openTextInputPage }) => {
    openTextInputPage;

    const textToInput = "Hi Cognigy!";
    await pageManager.onTextInputPage().textField.focus();
    //Emulate the keyboard input with pressSequentially() method
    await pageManager.onTextInputPage().textField.pressSequentially(textToInput);
    await pageManager.onTextInputPage().buttonToChange.click();

    //Make sure the button changed it's title
    await expect(pageManager.onTextInputPage().buttonToChange).toHaveText(textToInput);
  }
);

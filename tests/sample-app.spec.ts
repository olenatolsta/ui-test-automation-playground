import { test, expect } from "@fixtures/fixtures";
import environment from "@utilities/environment";

test(
  "OTTest-003 Fill in login info. Should display successful login/logout message",
  { tag: "@smoke @OTTest-003" },
  async ({ pageManager, openSampleAppPage }) => {
    openSampleAppPage;

    await test.step(`Verify that user can login and a success login message is displayed`, async () => {
      const userLoggedIn = "Welcome, ".concat(environment.login).concat("!");
      await pageManager
        .onSampleAppPage()
        .login(environment.login, environment.password);
      // Make sure the login status message is displayed
      await expect(pageManager.onSampleAppPage().loginStatus).toHaveText(
        userLoggedIn
      );
      // Make sure the button name changed to 'Log out'
      await expect(pageManager.onSampleAppPage().loginButton).toHaveText(
        "Log Out"
      );
    });

    await test.step(`Verify that user can log out and a message about log out is displayed`, async () => {
      pageManager.onSampleAppPage().loginButton.click();
      // Make sure the user is logged out by Login button text change
      await expect(pageManager.onSampleAppPage().loginButton).toHaveText(
        "Log In"
      );
    });
    // Make sure the user is logged out by changed status message
    await expect(pageManager.onSampleAppPage().loginStatus).toHaveText(
      "User logged out."
    );
  }
);

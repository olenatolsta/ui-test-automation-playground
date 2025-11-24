import { Page } from "@playwright/test";
import environment from "@utilities/environment";
import { AjaxDataPage } from "./ajax-data-handler.page";
import { TextInputPage } from "./text-input.page";
import { SampleAppPage } from "./sample-app.page";
import { DynamicTablePage } from "./dynamic-table-page";
import { ProgressBarPage } from "./progress-bar.page";
import { OverlappedElementPage } from "./overlapped-element.page";
import { VisibilityPage } from "./visibility.page";

export class PageManager {
  private readonly page: Page;

  /* Pages */
  private readonly ajaxDataPage: AjaxDataPage;
  private readonly textInputPage: TextInputPage;
  private readonly sampleAppPage: SampleAppPage;
  private readonly dynamicTablePage: DynamicTablePage;
  private readonly progressBarPage: ProgressBarPage;
  private readonly overlappedElementPage: OverlappedElementPage;
  private readonly visibilityPage: VisibilityPage;

  public constructor(page: Page) {
    this.page = page;

    /* Pages */
    this.ajaxDataPage = new AjaxDataPage(this.page);
    this.textInputPage = new TextInputPage(this.page);
    this.sampleAppPage = new SampleAppPage(this.page);
    this.dynamicTablePage = new DynamicTablePage(this.page);
    this.progressBarPage = new ProgressBarPage(this.page);
    this.overlappedElementPage = new OverlappedElementPage(this.page);
    this.visibilityPage = new VisibilityPage(this.page);
  }

  /**
   * Implementation of navigation to pages below
   */
  public async openAjaxPage() {
    await this.page.goto(`${environment.BASE_URL}/ajax`);
  }

  public async openTextInputPage() {
    await this.page.goto(`${environment.BASE_URL}/textinput`);
  }

  public async openSampleAppPage() {
    await this.page.goto(`${environment.BASE_URL}/sampleapp`);
  }

  public async openDynamicTablePage() {
    await this.page.goto(`${environment.BASE_URL}/dynamictable`);
  }

  public async openProgressBarPage() {
    await this.page.goto(`${environment.BASE_URL}/progressbar`);
  }

  public async openOverlappedElementPage() {
    await this.page.goto(`${environment.BASE_URL}/overlapped`);
  }

  public async openVisibilityPage() {
    await this.page.goto(`${environment.BASE_URL}/visibility`);
  }

  /* Pages */
  public onAjaxPage() {
    return this.ajaxDataPage;
  }

  public onTextInputPage() {
    return this.textInputPage;
  }

  public onSampleAppPage() {
    return this.sampleAppPage;
  }

  public onDynamicTablePage() {
    return this.dynamicTablePage;
  }

  public onProgressBarPage() {
    return this.progressBarPage;
  }

  public onOverlappedElementPage() {
    return this.overlappedElementPage;
  }

  public onVisibilityPage() {
    return this.visibilityPage;
  }
}

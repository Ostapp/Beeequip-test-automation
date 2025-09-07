import { Locator, Page } from "@playwright/test";
import BasePO from "./basePO";
import { TestHelper } from "../utils/testHelper";

export class LeaseSearchPO extends BasePO {
  private readonly KVKnumberInputLocator_Selector: string = "#cocNumber";
  private readonly emailInputLocator_Selector: string =
    '[data-hook="contact-person-email"]';
  private readonly submitButtonLocator_Selector: string = "#submitCompanyForm";

  constructor(page: Page) {
    super(page);
  }

  get kVKnumberInput(): Locator {
    return this.page.locator(this.KVKnumberInputLocator_Selector);
  }

  get emailInput(): Locator {
    return this.page.locator(this.emailInputLocator_Selector);
  }

  get submitButton(): Locator {
    return this.page.locator(this.submitButtonLocator_Selector);
  }

  async fillKVKnumber(KVKnumber: string): Promise<void> {
    await this.kVKnumberInput.fill(KVKnumber);
    await TestHelper.waitForVisibility(this.page.getByText("BEEQUIP B.V."));
    await this.page.getByText("BEEQUIP B.V.").click();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async clickSubmitButton(): Promise<void> {
    await TestHelper.waitForUrlChangeOnAction(this.page, async () => {
      await this.submitButton.click();
    });
  }
}

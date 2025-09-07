import { Locator, Page } from "@playwright/test";
import BasePO from "./basePO";
import { TestHelper } from "../utils/testHelper";

export class ListingPO extends BasePO {
  readonly leaseOfferButtonLocator_Selector: string =
    '[data-hook="lease-offer-button"]';

  constructor(page: Page) {
    super(page);
  }

  get leaseOfferButton(): Locator {
    return this.page.locator(this.leaseOfferButtonLocator_Selector);
  }

  async clickLeaseOfferButton(): Promise<void> {
    await TestHelper.waitForUrlChangeOnAction(this.page, async () => {
      await this.leaseOfferButton.click();
    });
  }
}

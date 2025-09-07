import { Page } from "@playwright/test";
import BasePO from "./basePO";

export class LandingPO extends BasePO {
  url = "https://staging.beequip.com/nl/";

  private readonly marketPlaceButtonRole: ["link", { name: string }] = [
    "link",
    { name: "Marktplaats" },
  ];

  constructor(page: Page) {
    super(page);
  }
  get marketPlaceButton() {
    return this.page.getByRole(...this.marketPlaceButtonRole).nth(2);
  }

  async clickMarketPlaceButton() {
    await this.marketPlaceButton.click();
  }
}

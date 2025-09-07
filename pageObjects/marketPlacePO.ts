import { Locator, Page } from "@playwright/test";
import BasePO from "./basePO";
import { TestHelper } from "../utils/testHelper";
import { AvailableCategories } from "../utils/enums";
import { CategoryPO } from "./categoryPO";
import {
  CategoryFilterTypeMapping,
  CategoryCheckboxMappings,
  SupportedCategories,
} from "./components/filters/types";

export class MarketPlacePO extends BasePO {
  url = "https://staging.beequip.com/marktplaats/";

  constructor(page: Page) {
    super(page);
  }

  getCategory(category: AvailableCategories): Locator {
    return this.page.getByRole("heading", { name: category }).getByRole("link");
  }

  async clickCategory(category: SupportedCategories): Promise<void> {
    await TestHelper.waitForUrlChangeOnAction(this.page, async () => {
      await this.getCategory(category).click();
    });
    // handle flakyness
    if ((await new CategoryPO(this.page, category).articlesList.count()) === 0)
      await this.page.reload();
  }
}

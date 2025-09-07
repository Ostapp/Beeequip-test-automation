import { expect, Locator, Page } from "@playwright/test";
import {
  CategoryCheckboxMappings,
  CategoryFilterNamesMapping,
  CategoryFilterTypeMapping,
  CheckboxKeys,
  DisplayName,
  Filter,
  RangeInputKeys,
  SupportedCategories,
} from "./types";
import { AvailableCategories, FilterTypes } from "./enums";

export class FilterComponentFactory {
  static createFilterComponentPO<
    C extends keyof CategoryFilterTypeMapping & keyof CategoryCheckboxMappings,
  >(page: Page, category: C): FilterComponentPO<C> {
    return new FilterComponentPO(page, category);
  }
  static createVrachtwagenFilterComponentPO(
    page: Page,
  ): FilterComponentPO<AvailableCategories.VRACHTWAGEN> {
    return new FilterComponentPO(page, AvailableCategories.VRACHTWAGEN);
  }
}

export class FilterComponentPO<C extends SupportedCategories> {
  constructor(
    readonly page: Page,
    readonly category: C,
  ) {}

  private getRangeInputLocator(filterName: RangeInputKeys<C>): Locator {
    return this.page
      .locator("fieldset")
      .filter({
        has: this.page.locator("legend", { hasText: filterName as string }),
      })
      .locator("input");
  }

  private getMinInputRangeLocator(filterName: RangeInputKeys<C>): Locator {
    return this.getRangeInputLocator(filterName).first();
  }

  private getMaxInputRangeLocator(filterName: RangeInputKeys<C>): Locator {
    return this.getRangeInputLocator(filterName).last();
  }

  private getSubmitRangeInputButton(filterName: RangeInputKeys<C>): Locator {
    return this.page
      .locator("fieldset")
      .filter({
        has: this.page.locator("legend", { hasText: filterName as string }),
      })
      .getByRole("button", { name: "OK" });
  }

  private getFilterButton(filterName: CategoryFilterNamesMapping[C]): Locator {
    return this.page.getByText(filterName as string).first();
  }

  private getShowMoreButton(filterName: DisplayName<C>): Locator {
    const targetElement = this.page
      .getByLabel(filterName)
      .getByRole("button", { name: "Bekijk meer" });
    return targetElement;
  }

  private async clickShowMoreButton(filterName: DisplayName<C>): Promise<void> {
    await this.getShowMoreButton(filterName).click();
  }

  private async getCheckbox<
    F extends DisplayName<C> &
      Extract<keyof CategoryCheckboxMappings[C], string>,
  >(
    filterName: F,
    checkboxName: CategoryCheckboxMappings[C][F],
  ): Promise<Locator> {
    let checkboxLocator: Locator;

    await this.page.waitForLoadState("networkidle");

    checkboxLocator = this.page
      .locator("fieldset")
      .filter({
        has: this.page.locator("legend", { hasText: filterName as string }),
      })
      .getByRole("link", { name: checkboxName as string, exact: true });

    if (!(await checkboxLocator.isVisible())) {
      if (String(filterName) !== "Subcategorie") {
        await this.clickFilterButton(
          filterName as CategoryFilterNamesMapping[C],
        );

        try {
          await expect(checkboxLocator).toBeVisible({ timeout: 5000 });
          return checkboxLocator;
        } catch {
          console.log(
            `Checkbox ${String(checkboxName)} not found in Subcategorie without expanding filter options`,
          );
        }
      }

      if ((await this.getShowMoreButton(filterName).count()) === 0) {
        throw new Error(
          `Checkbox ${checkboxName as string} not found among filter options of ${filterName} and no expand button available`,
        );
      }
      await this.clickShowMoreButton(filterName);

      await this.page.waitForLoadState("networkidle");

      try {
        await expect(checkboxLocator).toBeVisible({ timeout: 5000 });
        return checkboxLocator;
      } catch {
        throw new Error(
          `Checkbox ${checkboxName as string} not found even after expanding filter options of ${filterName}`,
        );
      }
    } else {
      return checkboxLocator;
    }
  }

  private async clickFilterButton(
    filterName: CategoryFilterNamesMapping[C],
  ): Promise<void> {
    await this.getFilterButton(filterName).click();
  }

  async fillInRangeInput(
    filterName: RangeInputKeys<C>,
    min: number,
    max: number,
  ): Promise<void> {
    const minInputLocator = this.getMinInputRangeLocator(filterName);
    const maxInputLocator = this.getMaxInputRangeLocator(filterName);
    await this.clickFilterButton(filterName as CategoryFilterNamesMapping[C]);
    await minInputLocator.fill(min.toString());
    await maxInputLocator.fill(max.toString());
    await this.getSubmitRangeInputButton(filterName).click();
  }

  async clickCheckbox<
    F extends DisplayName<C> &
      Extract<keyof CategoryCheckboxMappings[C], string>,
  >(
    filterName: F,
    checkboxName: CategoryCheckboxMappings[C][F],
  ): Promise<void> {
    const checkbox = await this.getCheckbox(filterName, checkboxName);
    await checkbox.click();
  }
}

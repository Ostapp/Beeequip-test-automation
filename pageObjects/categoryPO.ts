import BasePO from "./basePO";
import { Page } from "@playwright/test";
import type { FilterComponentPO } from "./components/filters/filterComponentPO";
import { FilterComponentPO as FilterComponentPOClass } from "./components/filters/filterComponentPO";
import { SupportedCategories } from "./components/filters/types";
/*
 * CategoryPO is the page object for the Category page.
 * It contains the filters and the articles list.
 * It also contains the methods to click on an article.
 */
export class CategoryPO<C extends SupportedCategories> extends BasePO {
  filters: FilterComponentPO<C>;
  readonly articlesListRole_Selector = "article";

  constructor(page: Page, category: C) {
    super(page);
    this.filters = new FilterComponentPOClass(page, category);
  }

  get articlesList() {
    return this.page.getByRole(this.articlesListRole_Selector);
  }

  async clickArticle(nth: number) {
    await this.articlesList.nth(nth).click();
  }
}

import { Page } from "@playwright/test";

class BasePO {
  url: string;

  constructor(protected readonly page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return await this.page.url();
  }

  async getPageSource() {
    return await this.page.content();
  }

  async getPageText() {}
}

export default BasePO;

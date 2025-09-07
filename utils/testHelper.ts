import { expect, Locator, Page } from "@playwright/test";

export class TestHelper {
  static async waitForUrlChangeOnAction(
    page: Page,
    action: () => Promise<void>,
    timeout: number = 10000,
  ): Promise<string> {
    const initialUrl = await page.evaluate(() => window.location.href);
    try {
      await action();
      return await this.waitForUrlChangeHelper(page, initialUrl, timeout);
    } catch (error) {
      console.log(
        `❌ URL did not change within ${timeout}ms after action: ${error}`,
      );
      throw new Error(`URL did not change within ${timeout}ms`);
    }
  }

  static async waitForUrlChangeHelper(
    page: Page,
    initialUrl: string,
    timeout: number,
  ): Promise<string> {
    const pollingInterval = 100; // ms between polls
    const maxTime = Date.now() + timeout;

    console.log(`Waiting for URL change from: ${initialUrl}`);

    while (Date.now() < maxTime) {
      const liveUrl = await page.evaluate(() => window.location.href);
      if (liveUrl !== initialUrl) {
        await page.waitForTimeout(300);
        const finalUrl = await page.evaluate(() => window.location.href);
        console.log(`URL changed to: ${finalUrl}`);
        return finalUrl;
      }
      await page.waitForTimeout(pollingInterval);
    }

    console.log(
      `❌ URL did not change within ${timeout}ms. Still at: ${initialUrl}`,
    );
    throw new Error(`URL did not change within ${timeout}ms`);
  }

  static async waitForVisibility(
    locator: Locator,
    timeout: number = 5000,
  ): Promise<boolean> {
    try {
      await expect(async () => {
        if (await locator.isVisible()) {
          console.log(`Element ${locator} is visible.`);
          return;
        }
      }).toPass({ intervals: [1000, 2000, 3000], timeout });
      return true;
    } catch (error) {
      console.log(
        `Element ${locator} not visible within ${timeout}ms: ${error}`,
      );
      return false;
    }
  }
}

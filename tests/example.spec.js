// @ts-check
import { test, expect } from "@playwright/test";

test("I can navigate to the Website", async ({ page }) => {
  await page.setExtraHTTPHeaders({
    Authorization:
      "Basic " + btoa("beequip-site-staging:X6T*JvQeKfYW6q*HCyFrUot9HRRm_Y-v"),
  });

  await page.goto("https://staging.beequip.com/");

  await expect(page).toHaveTitle(/Beequip MKB Equipment Lease/);
});

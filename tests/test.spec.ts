import { LandingPO } from "../pageObjects/landingPO";
import { MarketPlacePO } from "../pageObjects/marketPlacePO";
import { ListingPO } from "../pageObjects/listingPO";
import { LeasePriceResultPO } from "../pageObjects/leasePriceResultPO";
import { CategoryPO } from "../pageObjects/categoryPO";
import { LeaseSearchPO } from "../pageObjects/leaseSearchPO";
import test, { expect } from "@playwright/test";
import {
  SubcategorieCheckboxes,
  AantalCilindersCheckboxes,
  AvailableCategories,
} from "../pageObjects/components/filters/enums";
import { env } from "process";

const AUTH_TOKEN = env.AUTH_TOKEN;
const VERCEL_PROTECTION_BYPASS = env.VERCEL_PROTECTION_BYPASS;

test.use({
  extraHTTPHeaders: {
    Authorization:
        "Basic " + btoa(AUTH_TOKEN!),
        "x-vercel-protection-bypass": VERCEL_PROTECTION_BYPASS!,
  },
});

test("Increase downpayment must decrease lease price on lease search page", async ({
  page,
}) => {
  const landingPO: LandingPO = new LandingPO(page);
  const categoryPO = new CategoryPO(page, AvailableCategories.VRACHTWAGEN);
  const leasePriceResultPO = new LeasePriceResultPO(page);
  let initialMonthlyPayment: number;

  await test.step("Goto Landing Page", async () => {
    await landingPO.navigateTo();
  });
  await test.step("Goto MarketPlace Page", async () => {
    await landingPO.clickMarketPlaceButton();
  });
  await test.step(`Go to category -${AvailableCategories.VRACHTWAGEN}- page`, async () => {
    const marketPlacePO = new MarketPlacePO(page);
    await marketPlacePO.clickCategory(AvailableCategories.VRACHTWAGEN);
  });
  await test.step("Apply filters", async () => {
    await categoryPO.filters.clickCheckbox(
      "Subcategorie",
      SubcategorieCheckboxes.SCHUIFZEILEN,
    );
    await categoryPO.filters.fillInRangeInput("Bouwjaar", 2018, 2023);
    await categoryPO.filters.fillInRangeInput("Kilometerstand", 0, 150000);
    await categoryPO.filters.clickCheckbox(
      "Aantal cilinders",
      AantalCilindersCheckboxes.SIX,
    );
  });
  await test.step("Go to listing page", async () => {
    await categoryPO.clickArticle(0);
  });
  await test.step("Go to lease search page", async () => {
    const listingPO = new ListingPO(page);
    await listingPO.clickLeaseOfferButton();
  });
  await test.step("Fill in lease search form", async () => {
    const leaseSearchPO = new LeaseSearchPO(page);
    await leaseSearchPO.fillKVKnumber("63204258");
    await leaseSearchPO.fillEmail("test@example.com");
    await leaseSearchPO.clickSubmitButton();
  });
  await test.step("Increase downpayment", async () => {
    const leasePriceResultPO = new LeasePriceResultPO(page);
    initialMonthlyPayment = await leasePriceResultPO.getMonthlyPaymentAmount();
    await leasePriceResultPO.increaseDownpaymentBy(10000);
    await leasePriceResultPO.balloonPaymentInput.click();
    await page.waitForLoadState();
  });
  await test.step("Verify lease price decrease", async () => {
    const newMonthlyPayment =
      await leasePriceResultPO.getMonthlyPaymentAmount();
    expect(newMonthlyPayment).toBeLessThan(initialMonthlyPayment);
  });
});

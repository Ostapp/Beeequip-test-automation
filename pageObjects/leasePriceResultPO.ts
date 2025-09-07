import { Locator, Page } from "@playwright/test";
import BasePO from "./basePO";

export class LeasePriceResultPO extends BasePO {
  private readonly downpaymentInputLocator_Selector: string =
    '[data-hook="downpayment-input"]';
  private readonly balloonPaymentInputLocator_Selector: string =
    '[data-hook="balloon-payment-input"]';
  private readonly tenorInputLocator_Selector: string =
    '[data-hook="tenor-input"]';
  private readonly monthlyPaymentAmountLocator_Selector: string =
    '[data-hook="monthly-payment"] h2[role="heading"]';

  constructor(page: Page) {
    super(page);
  }

  async getMonthlyPaymentAmount(): Promise<number> {
    const result = (await this.monthlyPayment.textContent()) as string;
    const numericResult = result.replace(/[^0-9.]/g, "");
    return Number(numericResult);
  }

  get monthlyPayment(): Locator {
    return this.page.locator(this.monthlyPaymentAmountLocator_Selector);
  }

  get downpaymentInput(): Locator {
    return this.page.locator(this.downpaymentInputLocator_Selector);
  }

  get balloonPaymentInput(): Locator {
    return this.page.locator(this.balloonPaymentInputLocator_Selector);
  }

  get tenorInput(): Locator {
    return this.page.locator(this.tenorInputLocator_Selector);
  }

  async fillDownpayment(downpayment: string): Promise<void> {
    await this.downpaymentInput.click(); // Focus the input
    await this.downpaymentInput.selectText(); // Select all existing text
    await this.downpaymentInput.type(downpayment); // Type new value (replaces selected text)
    await this.downpaymentInput.press("Enter");
  }

  async fillBalloonPayment(balloonPayment: string): Promise<void> {
    await this.balloonPaymentInput.clear();
    await this.balloonPaymentInput.fill(balloonPayment);
  }

  async increaseDownpaymentBy(increaseBy: number): Promise<void> {
    const rawValue = await this.downpaymentInput.inputValue();
    const cleanedValue = rawValue.replace(/[^0-9,]/g, "").replace(",", ".");
    const defaultValue = Number(cleanedValue);
    const increasedValue = defaultValue + increaseBy;
    await this.fillDownpayment(increasedValue.toString());
  }

  async increaseTenorBy(increaseBy: number): Promise<void> {
    const defaultValue = Number(this.tenorInput.inputValue);
    if (defaultValue === 96) {
      throw new Error("Tenor is already at the maximum value of 96 months");
    }
    const increasedValue = defaultValue + increaseBy;
    if (increasedValue > 96) {
      throw new Error("Tenor cannot be greater than 96 months");
    }
    await this.tenorInput.clear();
    await this.tenorInput.fill(increasedValue.toString());
  }
}

import {Currency} from "../@types/currency";
import FreeCurrencyAPI from "../external_interfaces/FreeCurrencyAPI";

export class CurrencyConverter {
  #value: number;
  #system: string;

  constructor(value: number, system: string) {
    this.#value = value;
    this.#system = system;
  }

  public get value(): number {
    return this.#value;
  }

  public set value(v: number) {
    this.#value = v;
  }

  public get system(): string {
    return this.#system;
  }

  public set system(v: string) {
    this.#system = v;
  }

  async convert() {
    const convertedCurrencies: Currency[] = [];

    const currencyData: Object = await FreeCurrencyAPI.getExchangeRates(
      this.#system
    );

    const exchangeRates: Currency[] = Object.values(currencyData) as {
      code: string;
      value: number;
    }[];

    exchangeRates.forEach((rate) => {
      let convertedCurrency: Currency = {
        code: rate.code,
        value: 0,
      };

      convertedCurrency.value =
        Math.round(this.#value * rate.value * 100) / 100;

      convertedCurrencies.push(convertedCurrency);
    });

    return convertedCurrencies;
  }
}

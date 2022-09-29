import {CurrencyConverter} from "../classes/CurrencyConverter";
import FreeCurrencyAPI from "../external_interfaces/FreeCurrencyAPI";
jest.mock("../external_interfaces/FreeCurrencyAPI");

let currencyConverter: CurrencyConverter;

beforeEach(() => {
  currencyConverter = new CurrencyConverter(0, "");
});

const provideCurrency = [
  {
    value: 10,
    system: "DKK",
    results: [
      {
        code: "EUR",
        value: 1.3,
      },
      {
        code: "ZWL",
        value: 425.64,
      },
      {
        code: "VEF",
        value: 1061236.08,
      },
    ],
  },
  {
    value: 0, // 0
    system: "DKK",
    results: [
      {
        code: "EUR",
        value: 0,
      },
      {
        code: "ZWL",
        value: 0,
      },
      {
        code: "VEF",
        value: 0,
      },
    ],
  },
  {
    value: -10, // Negative
    system: "DKK",
    results: [
      {
        code: "EUR",
        value: -1.3,
      },
      {
        code: "ZWL",
        value: -425.64,
      },
      {
        code: "VEF",
        value: -1061236.08,
      },
    ],
  },
  {
    value: Number.MAX_SAFE_INTEGER, // Upper valid
    system: "DKK",
    results: [
      {
        code: "EUR",
        value: 1170935903116328.8,
      },
      {
        code: "ZWL",
        value: 383382420071596300,
      },
      {
        code: "VEF",
        value: 955876484959680900000,
      },
    ],
  },
  {
    value: Number.MAX_VALUE, // Upper invalid
    system: "DKK",
    results: [
      {
        code: "EUR",
        value: Infinity,
      },
      {
        code: "ZWL",
        value: Infinity,
      },
      {
        code: "VEF",
        value: Infinity,
      },
    ],
  },
  {
    value: -Number.MAX_SAFE_INTEGER, // Lower valid,
    system: "DKK",
    results: [
      {
        code: "EUR",
        value: -1170935903116328.8,
      },
      {
        code: "ZWL",
        value: -383382420071596300,
      },
      {
        code: "VEF",
        value: -955876484959680900000,
      },
    ],
  },
  {
    value: -Number.MAX_VALUE, // Lower invalid
    system: "DKK",
    results: [
      {
        code: "EUR",
        value: -Infinity,
      },
      {
        code: "ZWL",
        value: -Infinity,
      },
      {
        code: "VEF",
        value: -Infinity,
      },
    ],
  },
];

describe.each(provideCurrency)("Currency conversion", (currency) => {
  // I know this is horrendous. I'm so sorry
  const assertionStr = `${currency.value} ${currency.system} should be ${currency.results[0].value} ${currency.results[0].code}, ${currency.results[1].value} ${currency.results[1].code} and ${currency.results[2].value} ${currency.results[2].code}`;

  it(assertionStr, async () => {
    // Arrange
    currencyConverter.value = currency.value;
    currencyConverter.system = currency.system;
    const mockedService = FreeCurrencyAPI as jest.Mocked<
      typeof FreeCurrencyAPI
    >;
    mockedService.getExchangeRates.mockResolvedValue({
      EUR: {
        code: "EUR",
        value: 0.13,
      },
      ZWL: {
        code: "ZWL",
        value: 42.563999,
      },
      VEF: {
        code: "VEF",
        value: 106123.60823,
      },
    });

    // Act
    const conversion = await currencyConverter.convert();

    // Assert
    expect(conversion[0].value).toEqual(currency.results[0].value);
    expect(conversion[1].value).toEqual(currency.results[1].value);
    expect(conversion[2].value).toEqual(currency.results[2].value);
  });
});

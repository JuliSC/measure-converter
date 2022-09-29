import {WeightConverter} from "../classes/WeightConverter";

let weightConverter: WeightConverter;

beforeEach(() => {
  weightConverter = new WeightConverter(0, "");
});

const provideLength = [
  // White-box tests
  {
    value: 10,
    system: "Imperial",
    result: 4.54,
  },
  {
    value: 10,
    system: "Metric",
    result: 22.05,
  },
  // Black-box tests
  {
    value: -10, // Negatives
    system: "Metric",
    result: -22.05,
  },
  {
    value: 0, // 0
    system: "Metric",
    result: 0,
  },
  {
    value: Number.MAX_SAFE_INTEGER, // Valid upper boundary
    system: "Metric",
    result: 19857451620987080,
  },
  {
    value: Number.MAX_VALUE, // Invalid upper boundary
    system: "Imperial",
    result: Infinity,
  },
  {
    value: -Number.MAX_SAFE_INTEGER, // Valid lower boundary
    system: "Metric",
    result: -19857451620987080,
  },
  {
    value: -Number.MAX_VALUE, // Invalid lower boundary
    system: "Imperial",
    result: -Infinity,
  },
];

describe.each(provideLength)("Weight conversion", (length) => {
  const convertFromUnit = length.system === "Metric" ? "kilograms" : "pounds";
  const convertToUnit = length.system === "Metric" ? "pounds" : "kilograms";

  it(`${length.value} ${convertFromUnit} should be ${length.result} ${convertToUnit}`, () => {
    // Arrange
    weightConverter.value = length.value;
    weightConverter.system = length.system;

    //Act
    const convertedValue = weightConverter.convert();

    // Assert
    expect(convertedValue).toEqual(length.result);
  });
});

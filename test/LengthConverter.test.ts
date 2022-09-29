import {LengthConverter} from "../classes/LengthConverter";

let lengthConverter: LengthConverter;

beforeEach(() => {
  lengthConverter = new LengthConverter(0, "");
});

const provideLength = [
  // White-box tests
  {
    value: 2.5,
    system: "Imperial",
    result: 6.35,
  },
  {
    value: 2,
    system: "Metric",
    result: 0.79,
  },

  // Black-box tests
  {
    value: -2, // Negatives
    system: "Metric",
    result: -0.79, // Negatives
  },
  {
    value: 0, // 0
    system: "Metric",
    result: 0, // 0
  },
  {
    value: Number.MAX_SAFE_INTEGER, // Valid upper boundary
    system: "Metric",
    result: 3546134346591527.5,
  },
  {
    value: Number.MAX_VALUE, // Invalid upper boundary
    system: "Imperial",
    result: Infinity,
  },
  {
    value: -Number.MAX_SAFE_INTEGER, // Valid lower boundary
    system: "Metric",
    result: -3546134346591527.5,
  },
  {
    value: -Number.MAX_VALUE, // Invalid lower boundary
    system: "Imperial",
    result: -Infinity,
  },
];

describe.each(provideLength)("Length conversion", (length) => {
  const convertFromUnit = length.system === "Metric" ? "cm" : "inches";
  const convertToUnit = length.system === "Metric" ? "inches" : "cm";

  it(`${length.value} ${convertFromUnit} should be ${length.result} ${convertToUnit}`, () => {
    // Arrange
    lengthConverter.value = length.value;
    lengthConverter.system = length.system;

    // Act
    const convertedValue = lengthConverter.convert();

    // Assert
    expect(convertedValue).toEqual(length.result);
  });
});

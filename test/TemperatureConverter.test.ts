import {TemperatureConverter} from "../classes/TemperatureConverter";

let temperatureConverter: TemperatureConverter;

beforeEach(() => {
  temperatureConverter = new TemperatureConverter(0, "");
});

const provideSystem = [
  {
    system: "C",
    toScale: "F",
    function: "celsiusToFahrenheit()",
    result: 1,
  },
  {
    system: "C",
    toScale: "K",
    function: "celsiusToKelvin()",
    result: 2,
  },
  {
    system: "F",
    toScale: "C",
    function: "fahrenheitToCelsius()",
    result: 3,
  },
  {
    system: "F",
    toScale: "K",
    function: "fahrenheitToKelvin()",
    result: 4,
  },
  {
    system: "K",
    toScale: "C",
    function: "kelvinToCelsius()",
    result: 5,
  },
  {
    system: "K",
    toScale: "F",
    function: "kelvinToFahrenheit()",
    result: 6,
  },
];

// I know you don't like it
// But just to try it out, here it is
// Call me Mockingbird
describe.each(provideSystem)("Temperature conversion", (system) => {
  it(`Calling convert() with "${system.system} to ${system.toScale}" should call ${system.function}`, () => {
    // Arrange
    temperatureConverter.system = system.system;

    jest.spyOn(temperatureConverter, "celsiusToFahrenheit").mockReturnValue(1);
    jest.spyOn(temperatureConverter, "celsiusToKelvin").mockReturnValue(2);
    jest.spyOn(temperatureConverter, "fahrenheitToCelsius").mockReturnValue(3);
    jest.spyOn(temperatureConverter, "fahrenheitToKelvin").mockReturnValue(4);
    jest.spyOn(temperatureConverter, "kelvinToCelsius").mockReturnValue(5);
    jest.spyOn(temperatureConverter, "kelvinToFahrenheit").mockReturnValue(6);

    // Act
    const conversion = temperatureConverter.convert(system.toScale);

    // Assert
    expect(conversion).toEqual(system.result);
  });
});

const provideCelsius = [
  {
    value: 50,
    fahrenheitResult: 122,
    kelvinResult: 323.15,
  },
  {
    value: 0, // 0
    fahrenheitResult: 32,
    kelvinResult: 273.15,
  },
  {
    value: -50, // Negative
    fahrenheitResult: -58,
    kelvinResult: 223.15,
  },
  {
    value: Number.MAX_SAFE_INTEGER, // Valid upper boundary
    fahrenheitResult: 16212958658533816,
    kelvinResult: 9007199254741264,
  },
  {
    value: Number.MAX_VALUE, // Invalid upper boundary
    fahrenheitResult: Infinity,
    kelvinResult: Infinity,
  },
  {
    value: -Number.MAX_SAFE_INTEGER, // Valid lower boundary
    fahrenheitResult: -16212958658533752,
    kelvinResult: -9007199254740718,
  },
  {
    value: -Number.MAX_VALUE, // Invalid lower boundary
    fahrenheitResult: -Infinity,
    kelvinResult: -Infinity,
  },
];

describe.each(provideCelsius)("Celsius to fahrenheit", (celsius) => {
  it(`${celsius.value}°C should be ${celsius.fahrenheitResult}°F`, () => {
    // Arrange
    temperatureConverter.value = celsius.value;
    temperatureConverter.system = "C to F";

    // Act
    const conversion = temperatureConverter.celsiusToFahrenheit(celsius.value);

    // Assert
    expect(conversion).toEqual(celsius.fahrenheitResult);
  });
});

describe.each(provideCelsius)("Celsius to kelvin", (celsius) => {
  it(`${celsius.value}°C should be ${celsius.kelvinResult}°K`, () => {
    // Arrange
    temperatureConverter.value = celsius.value;
    temperatureConverter.system = "C to K";

    // Act
    const conversion = temperatureConverter.celsiusToKelvin(celsius.value);

    // Assert
    expect(conversion).toEqual(celsius.kelvinResult);
  });
});

const provideFahrenheit = [
  {
    value: 50,
    celsiusResult: 10,
    kelvinResult: 283.15,
  },
  {
    value: 0, // 0
    celsiusResult: -17.78,
    kelvinResult: 255.37,
  },
  {
    value: -50, // Negative
    celsiusResult: -45.56,
    kelvinResult: 227.59,
  },
  {
    value: Number.MAX_SAFE_INTEGER, // Valid upper boundary
    celsiusResult: 5004399905934077,
    kelvinResult: 5003999585967473,
  },
  {
    value: Number.MAX_VALUE, // Invalid upper boundary
    celsiusResult: Infinity,
    kelvinResult: Infinity,
  },
  {
    value: -Number.MAX_SAFE_INTEGER, // Valid lower boundary
    celsiusResult: -5004399905934113,
    kelvinResult: -5003999585966963,
  },
  {
    value: -Number.MAX_VALUE, // Invalid lower boundary
    celsiusResult: -Infinity,
    kelvinResult: -Infinity,
  },
];

describe.each(provideFahrenheit)("Fahrenheit to celsius", (fahrenheit) => {
  it(`${fahrenheit.value}°D should be ${fahrenheit.celsiusResult}°C`, () => {
    // Arrange
    const fahrenheitTemp = fahrenheit.value;

    // Act
    const conversion = temperatureConverter.fahrenheitToCelsius(fahrenheitTemp);

    // Assert
    expect(conversion).toEqual(fahrenheit.celsiusResult);
  });
});

describe.each(provideFahrenheit)("Fahrenheit to kelvin", (fahrenheit) => {
  it(`${fahrenheit.value}°F should be ${fahrenheit.kelvinResult}°K`, () => {
    // Arrange
    const fahrenheitTemp = fahrenheit.value;

    // Act
    const conversion = temperatureConverter.fahrenheitToKelvin(fahrenheitTemp);

    // Assert
    expect(conversion).toEqual(fahrenheit.kelvinResult);
  });
});

const provideKelvin = [
  {
    value: 50,
    celsiusResult: -223.15,
    fahrenheitResult: -369.67,
  },
  {
    value: 0, // 0
    celsiusResult: -273.15,
    fahrenheitResult: -459.67,
  },
  {
    value: -50, // Negative
    celsiusResult: -323.15,
    fahrenheitResult: -549.67,
  },
  {
    value: Number.MAX_SAFE_INTEGER, // Valid upper boundary
    celsiusResult: 9007199254740718,
    fahrenheitResult: 16212958658533324,
  },
  {
    value: Number.MAX_VALUE, // Invalid upper boundary
    celsiusResult: Infinity,
    fahrenheitResult: Infinity,
  },
  {
    value: -Number.MAX_SAFE_INTEGER, // Valid lower boundary
    celsiusResult: -9007199254741264,
    fahrenheitResult: -16212958658534244,
  },
  {
    value: -Number.MAX_VALUE, // Invalid lower boundary
    celsiusResult: -Infinity,
    fahrenheitResult: -Infinity,
  },
];

describe.each(provideKelvin)("Kelvin to celsius", (kelvin) => {
  it(`${kelvin.value}°K should be ${kelvin.celsiusResult}°C`, () => {
    // Arrange
    const kelvinTemp = kelvin.value;

    // Act
    const conversion = temperatureConverter.kelvinToCelsius(kelvinTemp);

    // Assert
    expect(conversion).toEqual(kelvin.celsiusResult);
  });
});

describe.each(provideKelvin)("Kelvin to fahrenheit", (kelvin) => {
  it(`${kelvin.value}°K should be ${kelvin.fahrenheitResult}°F`, () => {
    // Arrange
    const kelvinTemp = kelvin.value;

    // Act
    const conversion = temperatureConverter.kelvinToFahrenheit(kelvinTemp);

    // Assert
    expect(conversion).toEqual(kelvin.fahrenheitResult);
  });
});

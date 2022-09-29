export class TemperatureConverter {
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

  convert(toScale: string) {
    switch (`${this.#system} to ${toScale}`) {
      case "C to F":
        return this.celsiusToFahrenheit(this.#value);
      case "C to K":
        return this.celsiusToKelvin(this.#value);
      case "F to C":
        return this.fahrenheitToCelsius(this.#value);
      case "F to K":
        return this.fahrenheitToKelvin(this.#value);
      case "K to C":
        return this.kelvinToCelsius(this.#value);
      case "K to F":
        return this.kelvinToFahrenheit(this.#value);
      default:
        break;
    }
  }

  celsiusToFahrenheit(celsius: number) {
    return Math.round((celsius * (9 / 5) + 32) * 100) / 100;
  }

  celsiusToKelvin(celsius: number) {
    return Math.round((celsius + 273.15) * 100) / 100;
  }

  fahrenheitToCelsius(fahrenheit: number) {
    return Math.round((fahrenheit - 32) * 0.5556 * 100) / 100;
  }

  fahrenheitToKelvin(fahrenheit: number) {
    return Math.round(((fahrenheit - 32) * (5 / 9) + 273.15) * 100) / 100;
  }

  kelvinToCelsius(kelvin: number) {
    return Math.round((kelvin - 273.15) * 100) / 100;
  }

  kelvinToFahrenheit(kelvin: number) {
    return Math.round(((kelvin - 273.15) * 1.8 + 32) * 100) / 100;
  }
}

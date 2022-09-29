export class WeightConverter {
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

  convert() {
    if (this.#system === "Metric") {
      // Convert to Imperial
      return Math.round(this.#value * 2.20462 * 100) / 100;
    } else {
      // Convert to Metric
      return Math.round(this.#value * 0.453592 * 100) / 100;
    }
  }
}

import GradeDBService from "../external_interfaces/GradeDBService";

export class GradeConverter {
  #grade: string;
  #system: string;

  constructor(grade: string, system: string) {
    this.#grade = grade;
    this.#system = system;
  }

  public get grade(): string {
    return this.#grade;
  }

  public set grade(v: string) {
    this.#grade = v;
  }

  public get system(): string {
    return this.#system;
  }

  public set system(v: string) {
    this.#system = v;
  }

  async convert() {
    await GradeDBService.getConvertedGrade(this.#grade, this.#system);
  }
}

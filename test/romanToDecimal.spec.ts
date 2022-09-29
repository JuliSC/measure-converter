import {convertRomanString, romanToDecimal} from "../classes/RomanConverter";

// From the in-class exercise,
// Went with a casual approach, focusing on applying TDD
describe("Roman to decimal", () => {
  it("Roman I should be 1", () => {
    const decimal = romanToDecimal("I");
    expect(decimal).toEqual(1);
  });

  it("Roman V should be 5", () => {
    const decimal = romanToDecimal("V");
    expect(decimal).toEqual(5);
  });

  it("Roman VI should be 6", () => {
    const decimal = convertRomanString("VI");
    expect(decimal).toEqual(6);
  });

  it("Roman MDCLXVI should be 1666", () => {
    const decimal = convertRomanString("MDCLXVI");
    expect(decimal).toEqual(1666);
  });

  it("Roman XCIV should be 94", () => {
    const decimal = convertRomanString("XCIV");
    expect(decimal).toEqual(94);
  });
});

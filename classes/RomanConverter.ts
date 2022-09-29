type RomanNumeral = "I" | "V" | "X" | "L" | "C" | "D" | "M";
const romanTable = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

function romanToDecimal(romanNumeral: RomanNumeral) {
  return romanTable[romanNumeral];
}

function convertRomanString(romanString: string) {
  const romanArr = [...romanString] as RomanNumeral[];

  const sum = romanArr
    .map((char, i) => {
      const curDecimal = romanToDecimal(char);
      const nextDecimal = romanToDecimal(romanArr[i + 1]);

      if (curDecimal < nextDecimal && nextDecimal) {
        return -curDecimal;
      } else {
        return curDecimal;
      }
    })
    .reduce((curValue, nextValue) => curValue + nextValue);

  return sum;
}

export {romanToDecimal, convertRomanString};

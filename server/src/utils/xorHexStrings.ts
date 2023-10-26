export function xorHexStrings(hex1: string, hex2: string) {
  // Remove dashes from input strings
  hex1 = hex1.replace(/-/g, "");
  hex2 = hex2.replace(/-/g, "");

  // Convert hexadecimal strings to decimal numbers
  const decimalNumber1 = parseInt(hex1, 16);
  const decimalNumber2 = parseInt(hex2, 16);

  // Perform the XOR operation on decimal numbers
  const resultXORDecimal = decimalNumber1 ^ decimalNumber2;
  const resultHex = resultXORDecimal
    .toString(16)
    .toUpperCase()
    .padStart(16, "0");

  return resultHex;
}

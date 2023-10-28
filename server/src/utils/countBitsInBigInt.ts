import bigInt from "big-integer";

export function countBitsInBigInt(num: bigInt.BigInteger) {
  if (num.equals(0n)) {
    return 1;
  }

  const bitString = num.toString(2);
  return bitString.length - (num.lesser(0n) ? 1 : 0);
}

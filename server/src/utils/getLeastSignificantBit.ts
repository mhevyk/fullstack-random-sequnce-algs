export function getLeastSignificantBit(number: bigInt.BigInteger) {
  const leastSignificantBit = number.and(1);
  return leastSignificantBit;
}

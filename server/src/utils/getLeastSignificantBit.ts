import { Bit } from "../types";

export function getLeastSignificantBit(number: bigInt.BigInteger) {
  const leastSignificantBit = number.and(1);
  return Number(leastSignificantBit) as Bit;
}

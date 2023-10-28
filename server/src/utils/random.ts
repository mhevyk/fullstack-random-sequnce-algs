import crypto from "crypto";
import bigInt from "big-integer";

export const Random = {
  Int: {
    Range: (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
  Bit: () => {
    return Random.Int.Range(0, 1);
  },
  BigInt: {
    Bits: (bits: number) => {
      const min = bigInt(1).shiftLeft(bits - 1);
      const max = bigInt(1).shiftLeft(bits).subtract(1);
      const randomBigInt = bigInt.randBetween(min, max);
      return randomBigInt;
    },
    Range: (
      min: number | bigInt.BigInteger,
      max: number | bigInt.BigInteger
    ) => {
      const bigMin = bigInt.isInstance(min) ? min : bigInt(min);
      const bigMax = bigInt.isInstance(max) ? max : bigInt(max);

      if (bigMin.compare(bigMax) > 0) {
        throw new Error(
          "Invalid range. min must be less than or equal to max."
        );
      }

      const rangeSize = bigMax.minus(bigMin);
      const randomOffset = bigInt.randBetween(bigInt.zero, rangeSize);

      return bigMin.plus(randomOffset);
    },
  },
};

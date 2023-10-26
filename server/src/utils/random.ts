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
  Hex: {
    Bits: (bits: number) => {
      const bytes = Math.floor(bits / 8);
      const buffer = crypto.randomBytes(bytes);
      return buffer.toString("hex");
    },
  },
  BigInt: {
    Bits: (bits: number) => {
      return bigInt(Random.Hex.Bits(bits), 16);
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

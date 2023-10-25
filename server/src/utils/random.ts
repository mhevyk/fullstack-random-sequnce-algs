import crypto from "crypto";
import bigInt from "big-integer";

type IntConfig = {
  min: number;
  max: number;
};

type HexConfig = {
  bits: number;
};

type BigIntConfig = {
  bits: number;
};

export class Random {
  static Int({ min, max }: IntConfig) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static Bit() {
    return Random.Int({ min: 0, max: 1 });
  }

  static Hex({ bits }: HexConfig) {
    const bytes = Math.floor(bits / 8);
    const buffer = crypto.randomBytes(bytes);
    return buffer.toString("hex");
  }

  static BigInt({ bits }: BigIntConfig) {
    return bigInt(Random.Hex({ bits }), 16);
  }
}

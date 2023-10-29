import bigInt from "big-integer";
import { Random } from "../utils/random.js";
import { encryptWithSHA1 } from "../utils/encrypt.js";
import { getLeastSignificantBit } from "../utils/getLeastSignificantBit.js";
import { Bit } from "../types/index.js";

// limit: max number to generate not inclusive
export function fips186(generatedWordsCount: number, limit: string) {
  const b = Random.Int.Range(160, 512);
  let s = Random.BigInt.Bits(b);
  const t = "67452301efcdab8998badcfe10325476c3d2e1f0";

  const sequence: Bit[] = [];

  for (let i = 0; i < generatedWordsCount; i++) {
    const coin = Random.Bit();
    const yi = coin === 1 ? Random.BigInt.Bits(b) : 0;

    const zi = s.add(yi).mod(2 ** b);
    const xi = G(t, zi).mod(bigInt(limit));
    sequence.push(getLeastSignificantBit(xi));

    s = s
      .add(1)
      .add(xi)
      .mod(2 ** b);
  }

  return sequence;
}

function G(t: string, c: bigInt.BigInteger) {
  const cWord = c.toString(16);
  const cPadded = cWord.padEnd(128, "0");

  const combinedWord = t + cPadded;
  const hash = encryptWithSHA1(combinedWord);
  return bigInt(hash, 16);
}

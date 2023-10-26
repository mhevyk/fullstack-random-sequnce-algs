import bigInt from "big-integer";
import { xorHexStrings } from "../utils/xorHexStrings.js";
import { encryptWith3DES } from "../utils/encrypt.js";
import { getCurrentTimestampWord } from "../utils/getCurrentTimestampWord.js";

export function ansix917(
  s0: string,
  key: string,
  generatedWordsCount: number,
  limit: number
) {
  const Temp = encryptWith3DES(getCurrentTimestampWord(), key);
  let s = s0.toUpperCase();

  const sequence: bigInt.BigInteger[] = [];
  for (let i = 0; i < generatedWordsCount; i++) {
    const xi = encryptWith3DES(xorHexStrings(s, Temp), key);
    const xiBigInt = bigInt(xi, 16).mod(limit);
    sequence.push(xiBigInt);

    s = encryptWith3DES(xorHexStrings(xi, Temp), key);
  }
  return sequence;
}

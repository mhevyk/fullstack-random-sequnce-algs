import bigInt from "big-integer";
import { xorHexStrings } from "../utils/xorHexStrings.js";
import { encryptWith3DES } from "../utils/encrypt.js";
import { getCurrentTimestampWord } from "../utils/getCurrentTimestampWord.js";
import { getLeastSignificantBit } from "../utils/getLeastSignificantBit.js";
import { Bit } from "../types/index.js";

export function ansix917(s0: string, key: string, generatedWordsCount: number) {
  const Temp = encryptWith3DES(getCurrentTimestampWord(), key);
  let s = s0.toUpperCase();

  const sequence: Bit[] = [];

  for (let i = 0; i < generatedWordsCount; i++) {
    const xi = encryptWith3DES(xorHexStrings(s, Temp), key);
    const xiBigInt = bigInt(xi, 16);
    sequence.push(getLeastSignificantBit(xiBigInt));

    s = encryptWith3DES(xorHexStrings(xi, Temp), key);
  }
  return sequence;
}

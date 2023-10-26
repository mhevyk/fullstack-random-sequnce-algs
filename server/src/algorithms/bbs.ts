import bigInt from "big-integer";
import { Random } from "../utils/random.js";
import { toRemainder } from "../utils/toRemainder.js";
import { findClosestPrime } from "../utils/isPrime.js";
import { getLeastSignificantBit } from "../utils/getLeastSignificantBit.js";

export function bbs(generatedWordsCount: number) {
  const p = toRemainder({
    value: Random.BigInt.Bits(1024),
    remainder: 3,
    divisor: 4,
  });
  const q = toRemainder({
    value: Random.BigInt.Bits(1024),
    remainder: 3,
    divisor: 4,
  });

  const N = p.times(q);

  const Range = Random.BigInt.Range(1, N.minus(1));
  const s = findClosestPrime(Range);

  let u = s.pow(2).mod(N);

  const sequence: bigInt.BigInteger[] = [];

  for (let i = 0; i < generatedWordsCount; i++) {
    u = u.pow(2).mod(N);
    sequence.push(getLeastSignificantBit(u));
  }

  return sequence;
}

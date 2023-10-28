import { Bit } from "../types";
import { STATISTIC_LIMIT } from "./constants";

export function consecutiveRepeatTest(sequence: Bit[]) {
  const n = sequence.length;
  let sum = 0;
  for (const bit of sequence) {
    sum += bit;
  }

  const pi = (1 / n) * sum;

  let V = 1;

  for (let i = 0; i < sequence.length - 1; i++) {
    V += sequence[i] === sequence[i + 1] ? 0 : 1;
  }

  const statistic =
    Math.abs(V - 2 * n * pi * (1 - pi)) /
    (2 * Math.sqrt(2 * n) * pi * (1 - pi));

  return statistic <= STATISTIC_LIMIT;
}

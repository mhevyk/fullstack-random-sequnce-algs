import { Bit } from "../types";
import { STATISTIC_LIMIT } from "./constants";

export function frequencyTest(sequence: Bit[]) {
  let sum = 0;
  for (const bit of sequence) {
    const x = 2 * bit - 1;
    sum += x;
  }

  const statistic = Math.abs(sum) / Math.sqrt(sequence.length);
  return statistic <= STATISTIC_LIMIT;
}

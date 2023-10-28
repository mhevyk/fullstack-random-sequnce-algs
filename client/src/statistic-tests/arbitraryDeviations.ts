import { Bit } from "../types";

export function arbitraryDeviationsTest(sequence: Bit[]) {
  // сформуємо послідовність [0, x1, x2, x3, ..., xn, 0]
  const newSequnce = [0];

  for (let i = 0; i < sequence.length; i++) {
    const bit = sequence[i];
    const x = 2 * bit - 1;
    newSequnce.push(newSequnce[i] + x);
  }

  newSequnce.push(0);

  // підраховуємо кількість кожного входження числа від -9 до 9
  const map = new Map();

  for (const item of newSequnce) {
    if (Math.abs(item) > 9) {
      continue;
    }

    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  }

  const zerosCount = map.get(0) - 1;

  for (let j = -9; j <= 9; j++) {
    if (j === 0) {
      continue;
    }

    const stateOccurence = map.get(j) ?? 0;
    const statistic =
      Math.abs(stateOccurence - zerosCount) /
      Math.sqrt(2 * zerosCount * (4 * Math.abs(j) - 2));
    if (statistic > 1.82138636) {
      return false;
    }
  }

  return true;
}

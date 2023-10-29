import { Bit } from "../types";
import { STATISTIC_LIMIT, Step } from "./constants";

export function frequencyTest(sequence: Bit[]) {
  const steps: Step[] = [];

  let sum = 0;
  const xSequence: number[] = [];
  for (const bit of sequence) {
    const x = 2 * bit - 1;
    xSequence.push(x);
    sum += x;
  }

  steps.push({
    description:
      "Обчислимо послідовність за формулою X_i=2*\\varepsilon_i-1, де \\varepsilon_i - елемент вхідної послідовності",
    value: xSequence,
  });

  steps.push({
    description:
      "Обчислимо суму за формулою S_n=X_1+X_2+...+X_n, де n - кількість елементів, що перевіряється",
    value: sum,
  });

  const statistic = Math.abs(sum) / Math.sqrt(sequence.length);

  steps.push({
    description:
      "Обчислимо статистику за формулою S = \\frac{|S_n|}{\\sqrt{n}}",
    value: statistic,
  });

  const passed = statistic <= STATISTIC_LIMIT;

  steps.push({
    description: `Виконаємо перевірку S\\leq ${STATISTIC_LIMIT}`,
    value: passed ? "Так" : "Ні",
  });

  return {
    steps,
    passed,
  };
}

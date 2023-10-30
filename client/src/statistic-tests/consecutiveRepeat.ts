import { Bit } from "../types";
import { STATISTIC_LIMIT, Step } from "./constants";

export function consecutiveRepeatTest(sequence: Bit[]) {
  const steps: Step[] = [];

  const n = sequence.length;
  let sum = 0;
  for (const bit of sequence) {
    sum += bit;
  }

  const pi = (1 / n) * sum;

  steps.push({
    description: `Обчислюємо частоту, з якою у послідовності зустрічаються одиниці за формулою \\pi=\\frac{1}{n} *\\sum_{j=1}^{n}\\varepsilon_j`,
    value: { type: "value", data: pi },
  });

  let V = 1;

  for (let i = 0; i < sequence.length - 1; i++) {
    V += sequence[i] === sequence[i + 1] ? 0 : 1;
  }

  steps.push({
    description: `Обчислюємо значення V_n=1+\\sum r(k), де r(k)=0, якщо \\varepsilon_k=\\varepsilon_{k+1} і r(k)=1 інакше`,
    value: { type: "value", data: V },
  });

  const statistic =
    Math.abs(V - 2 * n * pi * (1 - pi)) /
    (2 * Math.sqrt(2 * n) * pi * (1 - pi));

  steps.push({
    description:
      "Обчислимо статистику за формулою S = \\frac{|V_n-2*n*\\pi*(1-\\pi)|}{2*\\sqrt{2n}*\\pi*(1-\\pi)}",
    value: { type: "value", data: statistic },
  });

  const passed = statistic <= STATISTIC_LIMIT;

  steps.push({
    description: `Виконаємо перевірку S\\leq ${STATISTIC_LIMIT}`,
    value: { type: "value", data: passed ? "Так" : "Ні" },
  });

  return {
    steps,
    passed,
  };
}

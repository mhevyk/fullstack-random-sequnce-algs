import { Bit } from "../types";
import { STATISTIC_LIMIT, Step } from "./constants";

export function arbitraryDeviationsTest(sequence: Bit[]) {
  const steps: Step[] = [];
  const xSequence = [];
  const newSequnce = [0];

  for (let i = 0; i < sequence.length; i++) {
    const bit = sequence[i];
    const x = 2 * bit - 1;
    xSequence.push(x);
    newSequnce.push(newSequnce[i] + x);
  }

  newSequnce.push(0);

  steps.push({
    description:
      "Обчислимо послідовність за формулою X_i=2*\\varepsilon_i-1, де \\varepsilon_i - елемент вхідної послідовності",
    value: { type: "bitlist", data: xSequence },
  });

  steps.push({
    description:
      "Формуємо нову послідовність S'=0, S_1, S_2, ..., S_n, 0, де S_1=X_1, S_2=X_1+X_2, S_3=X_1+X_2+X_3, S_n=X_1+X_2+X_3+...+S_n",
    value: { type: "bitlist", data: newSequnce },
  });

  const map = new Map<number, number>();

  for (const item of newSequnce) {
    if (Math.abs(item) > 9) {
      continue;
    }

    if (map.has(item)) {
      map.set(item, map.get(item)! + 1);
    } else {
      map.set(item, 1);
    }
  }

  steps.push({
    description:
      "Для кожного з 18 станів обчислюється \\xi_j, яке показує, скільки раз стан j зустрічався в послідовності S', де j=-9,-8,...,-1,0,1,...,8,9",
    value: {
      type: "table",
      data: {
        labels: ["Стан \\xi_j", "Кількість входжень у послідовність S'"],
        dataset: Object.fromEntries(map.entries()),
      },
    },
  });

  const zerosCount = map.get(0)! - 1;

  steps.push({
    description:
      "Обчислюється L=k-1, де k - кількість нулів в отриманій послідовності S'",
    value: { type: "value", data: zerosCount },
  });

  let passed = true;

  const statistics: number[] = [];
  for (let j = -9; j <= 9; j++) {
    if (j === 0) {
      continue;
    }

    const stateOccurence = map.get(j) ?? 0;
    const statistic =
      Math.abs(stateOccurence - zerosCount) /
      Math.sqrt(2 * zerosCount * (4 * Math.abs(j) - 2));
    if (statistic > STATISTIC_LIMIT) {
      passed = false;
      break;
    }

    statistics.push(statistic);
  }

  steps.push({
    description:
      "Обчислюється 18 статистик за формулою Y_j=\\frac{|\\xi_j-L|}{\\sqrt{2*L*(4*|j|-2)}}, де j=-9,-8,...,-1,1,...,8,9",
    value: {
      type: "table",
      data: {
        labels: ["j", "\\xi_j"],
        dataset: statistics.reduce((acc, statistic, index) => {
          acc[index + 1] = statistic;
          return acc;
        }, {} as Record<number, number>),
      },
    },
  });

  steps.push({
    description: `Перевіримо, чи всі статистики Y_j\\leq${STATISTIC_LIMIT}. Якщо так, то вважаємо тест успішно пройденим`,
    value: {
      type: "value",
      data: passed
        ? "Так"
        : `Ні, умова не виконується для статистики ${statistics.length}`,
    },
  });

  return {
    steps,
    passed,
  };
}

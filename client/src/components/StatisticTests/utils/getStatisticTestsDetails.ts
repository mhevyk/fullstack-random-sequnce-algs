import {
  arbitraryDeviationsTest,
  consecutiveRepeatTest,
  frequencyTest,
} from "../../../statistic-tests";
import { Bit } from "../../../types";

const tests = [
  { name: "Частотний тест", check: frequencyTest },
  { name: "Тест на послідовність однакових біт", check: consecutiveRepeatTest },
  {
    name: "Розширений тест на довільні відхилення",
    check: arbitraryDeviationsTest,
  },
];

type TestResult = {
  name: string;
  passed: boolean;
  duration: number;
};

export function getStatisticTestsDetails(sequence: Bit[]) {
  const testDetails: TestResult[] = [];

  for (const test of tests) {
    const timerStart = performance.now();
    const passed = test.check(sequence);
    const timerEnd = performance.now();
    const duration = timerEnd - timerStart;
    testDetails.push({ name: test.name, passed, duration });
  }

  return testDetails;
}

import { Bit } from "../../types";
import { Section } from "../Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import { memo } from "react";
import { getStatisticTestsDetails } from "./utils/getStatisticTestsDetails";

type StatisticTestsProps = {
  sequence: Bit[];
  isLoading: boolean;
};

function renderTests(testResults: ReturnType<typeof getStatisticTestsDetails>) {
  const isSuitePassed = testResults.every(testResult => testResult.passed);

  return (
    <>
      {testResults.map(testResult => (
        <div key={testResult.name}>
          <span className="pe-3">
            {testResult.passed ? (
              <FontAwesomeIcon icon={faCheck} className="text-success" />
            ) : (
              <FontAwesomeIcon icon={faTimes} className="text-danger" />
            )}
          </span>
          {testResult.name}, витрачений час: ≈{testResult.duration} мілісекунд
        </div>
      ))}
      <p className="mt-4">
        <strong>Висновок:</strong> Послідовність
        {isSuitePassed ? " " : <span className="text-danger"> НЕ</span>} є
        криптографічно безпечною
      </p>
    </>
  );
}

function Component({ sequence, isLoading }: StatisticTestsProps) {
  const testDetails = getStatisticTestsDetails(sequence);

  return (
    <Section title="Тести">
      {isLoading ? <Spinner size="sm" /> : renderTests(testDetails)}
    </Section>
  );
}

export const StatisticTests = memo(Component);

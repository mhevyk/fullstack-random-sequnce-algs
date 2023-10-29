import { Bit } from "../../types";
import { Section, BitList } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Accordion, Pagination, Spinner } from "react-bootstrap";
import { memo } from "react";
import { getStatisticTestsDetails } from "./utils/getStatisticTestsDetails";
import { Step } from "../../statistic-tests/constants";
import { useSteps } from "./hooks/useSteps";
import { renderHighlightedFormulas } from "./utils/renderHighlightedFormulas";

type AlgorithmStepsProps = {
  steps: Step[];
};

function AlgorithmSteps({ steps }: AlgorithmStepsProps) {
  const {
    activeStep,
    activeStepContent,
    lastStep,
    canGoBack,
    canGoNext,
    goToStep,
    goToFirstStep,
    goToLastStep,
    goToPrevStep,
    goToNextStep,
  } = useSteps(steps);

  return (
    <div>
      <div className="pt-2" style={{ minHeight: 220 }}>
        <div>
          <strong>Крок {activeStep + 1}:</strong>{" "}
          <span className="step-description">
            {renderHighlightedFormulas(activeStepContent.description)}
          </span>
        </div>
        Результат:{" "}
        {Array.isArray(activeStepContent.value) ? (
          <BitList data={activeStepContent.value} />
        ) : (
          activeStepContent.value
        )}
      </div>
      <Pagination className="justify-content-center">
        <Pagination.First onClick={goToFirstStep} disabled={activeStep === 0} />
        <Pagination.Prev onClick={goToPrevStep} disabled={!canGoBack} />
        {steps.map((_, index) => (
          <Pagination.Item
            onClick={() => goToStep(index)}
            key={index}
            active={index === activeStep}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={goToNextStep} disabled={!canGoNext} />
        <Pagination.Last
          onClick={goToLastStep}
          disabled={activeStep === lastStep}
        />
      </Pagination>
    </div>
  );
}

type StatisticTestsProps = {
  sequence: Bit[];
  isLoading: boolean;
};

function renderTests(testResults: ReturnType<typeof getStatisticTestsDetails>) {
  const isSuitePassed = testResults.every(testResult => testResult.passed);

  return (
    <Accordion>
      {testResults.map((testResult, index) => (
        <Accordion.Item key={testResult.name} eventKey={index.toString()}>
          <Accordion.Header>
            <span className="pe-2">
              {testResult.passed ? (
                <FontAwesomeIcon icon={faCheck} className="text-success" />
              ) : (
                <FontAwesomeIcon icon={faTimes} className="text-danger" />
              )}
            </span>
            {testResult.name}, витрачений час: ≈{testResult.duration} мілісекунд
          </Accordion.Header>
          <Accordion.Body as="ol" className="mx-3">
            <AlgorithmSteps steps={testResult.steps} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
      <p className="mt-4">
        <strong>Висновок:</strong> Послідовність
        {isSuitePassed ? " " : <span className="text-danger"> НЕ</span>} є
        криптографічно безпечною
      </p>
    </Accordion>
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

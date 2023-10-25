import { useState } from "react";
import { Algorithm } from "../../api/types";
import { useAlgorithmSteps } from "../../hooks/useAlgorithmSteps";
import { Button } from "../../components";
import { Alert, ProgressBar } from "react-bootstrap";
import TeX from "@matejmazur/react-katex";

const katexSettings = {
  output: "mathml",
  macros: { " ": "\\:" },
  strict: false,
};

export function AlgorithmWalkthrough() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("fips186");
  const {
    query,
    pagination: {
      page,
      totalPages,
      hasPreviousStep,
      previousStep,
      hasNextStep,
      nextStep,
    },
  } = useAlgorithmSteps(algorithm);

  const step = query.data?.data[0];

  console.log(step);

  return (
    <>
      <ProgressBar
        min={0}
        max={totalPages}
        now={page}
        label={page === totalPages ? "Завершено" : `${page}/${totalPages}`}
        variant={page === totalPages ? "success" : "primary"}
      />
      <div>
        <h3>Виконання алгоритму</h3>
        <p>Алгоритм: {algorithm}</p>
      </div>
      {step && (
        <>
          <Alert style={{ minHeight: 100 }} className="mb-0">
            <div></div>
            <h6>
              <TeX settings={katexSettings}>{step.description}</TeX>:
            </h6>
            {step.value ? (
              <div>
                Результат:{" "}
                <TeX settings={katexSettings}>{step.value.toString()}</TeX>
              </div>
            ) : (
              <p className="text-success">Виконано</p>
            )}
          </Alert>
          <div>
            <Button onClick={previousStep} disabled={!hasPreviousStep}>
              Попередній крок
            </Button>{" "}
            <Button onClick={nextStep} disabled={!hasNextStep}>
              Наступний крок
            </Button>
          </div>
        </>
      )}
    </>
  );
}

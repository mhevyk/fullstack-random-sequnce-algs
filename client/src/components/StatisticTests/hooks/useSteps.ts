import { useState } from "react";
import { Step } from "../../../statistic-tests/constants";

export function useSteps(steps: Step[]) {
  const [activeStep, setActiveStep] = useState(0);

  const lastStep = steps.length - 1;
  const activeStepContent = steps[activeStep];
  const canGoNext = activeStep < lastStep;
  const canGoBack = activeStep > 0;

  function goToStep(stepIndex: number) {
    setActiveStep(stepIndex);
  }

  function goToFirstStep() {
    goToStep(0);
  }

  function goToLastStep() {
    goToStep(lastStep);
  }

  function goToPrevStep() {
    if (canGoBack) {
      goToStep(activeStep - 1);
    }
  }

  function goToNextStep() {
    if (canGoNext) {
      goToStep(activeStep + 1);
    }
  }

  return {
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
  };
}

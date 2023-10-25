import { useState } from "react";
import { useQuery } from "react-query";
import { Algorithm } from "../api/types";
import { getAlgorithmSteps } from "../api";

export function useAlgorithmSteps(algorithm: Algorithm) {
  const [page, setPage] = useState(1);

  const query = useQuery(["steps", algorithm, { page }], () =>
    getAlgorithmSteps(algorithm, page)
  );

  const hasPreviousStep = page > 1;
  const totalPages = query.data?.totalPages || 1;
  const hasNextStep = page < totalPages;

  function nextStep() {
    if (hasNextStep) {
      setPage(prevPage => prevPage + 1);
    }
  }

  function previousStep() {
    if (hasPreviousStep) {
      setPage(prevPage => prevPage - 1);
    }
  }

  return {
    query,
    pagination: {
      page,
      totalPages,
      hasNextStep,
      nextStep,
      hasPreviousStep,
      previousStep,
    },
  };
}

import { useQuery } from "react-query";
import { Algorithm } from "../types";
import { getRandomSequence } from "../api";
import { APIError } from "../api/types";

export function useRandomSequenceQuery<TData>(
  algorithm: Algorithm,
  params?: URLSearchParams
) {
  return useQuery<TData, APIError>({
    queryKey: algorithm,
    queryFn: () => getRandomSequence<TData>(algorithm, params),
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      const RETRY_ATTEMPTS = 2;
      return Boolean(failureCount < RETRY_ATTEMPTS - 1 && error);
    },
    enabled: false, // don`t fetch on mount
  });
}

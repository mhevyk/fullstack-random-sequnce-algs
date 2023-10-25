import { AxiosError } from "axios";
import { Alert } from "react-bootstrap";
import { UseMutationResult, UseQueryResult } from "react-query";

type FeedbackProps<TResponse, TVariables, TContext> = {
  on:
    | UseMutationResult<TResponse, AxiosError, TVariables, TContext>
    | UseQueryResult<TResponse, AxiosError>;
  hideSuccess?: boolean;
  label?: string;
};

export function Feedback<TResponse, TVariables, TContext>({
  on,
  label,
  hideSuccess = false,
}: FeedbackProps<TResponse, TVariables, TContext>) {
  return (
    <>
      {on.isSuccess && !hideSuccess && (
        <Alert variant="success" className="m-0">
          {label && <h6 className="alert-heading">{label}</h6>}
          Операція виконана успішно!
        </Alert>
      )}
      {on.isError && (
        <Alert variant="danger" className="m-0">
          {label && <h6 className="alert-heading">{label}</h6>}
          Помилка: {on.error?.message}
        </Alert>
      )}
    </>
  );
}

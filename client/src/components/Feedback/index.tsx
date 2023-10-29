import { ReactNode } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { UseBaseQueryResult } from "react-query";
import { APIError } from "../../api/types";

type FeedbackProps<TResult extends UseBaseQueryResult<any, APIError>> = {
  on: TResult;
  label?: string;
  content: ReactNode;
};

type ErrorLayputProps = {
  error: APIError;
};

function ErrorLayout({ error }: ErrorLayputProps) {
  return (
    <>
      Помилка: {error.response?.data.message || error.message}
      {error.response?.data.errors && (
        <ul className="mb-0">
          {error.response.data.errors.map(error => (
            <li key={error.message}>{error.message}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export function Feedback<TResult extends UseBaseQueryResult<any, APIError>>({
  on,
  label,
  content,
}: FeedbackProps<TResult>) {
  const { isFetching, isSuccess, isError, error } = on;
  let variant = null;

  if (isFetching) {
    variant = "primary";
  } else if (isSuccess) {
    variant = "success";
  } else if (isError) {
    variant = "danger";
  }

  return (
    variant && (
      <Alert variant={variant}>
        {isFetching ? (
          <Spinner size="sm" />
        ) : (
          <>
            {label && <h6 className="alert-heading">{label}</h6>}
            {isSuccess && content}
            {isError && <ErrorLayout error={error} />}
          </>
        )}
      </Alert>
    )
  );
}

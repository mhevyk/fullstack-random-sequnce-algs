import { Button, Form, FormControlProps, InputGroup } from "react-bootstrap";
import { useEffect, useId } from "react";
import { useRandomBigIntQuery } from "./hooks/useRandomBigIntQuery";

type Props = FormControlProps & {
  bits: number;
  value: string;
  setValue: (value: string) => void;
};

export function RandomBigIntegerInput({
  bits,
  value,
  setValue,
  ...props
}: Props) {
  const id = useId();
  const { data, refetch } = useRandomBigIntQuery(bits, id);

  useEffect(() => {
    if (data?.value && data.value !== value) {
      setValue(data?.value);
    }
  }, [data?.value]);

  return (
    <InputGroup className="mb-3">
      <Form.Control
        value={value}
        onChange={e => setValue(e.target.value)}
        aria-describedby={id}
        {...props}
      />
      <Button variant="outline-secondary" id={id} onClick={() => refetch()}>
        Згенерувати
      </Button>
    </InputGroup>
  );
}

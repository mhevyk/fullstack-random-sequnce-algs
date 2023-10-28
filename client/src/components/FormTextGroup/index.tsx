import { PropsWithChildren, ReactNode } from "react";
import { Form } from "react-bootstrap";

type FormTextGroupProps = PropsWithChildren & {
  label: ReactNode;
};

export function FormTextGroup({ label, children }: FormTextGroupProps) {
  return (
    <Form.Group className="inner-gap-sm">
      <Form.Text>{label}</Form.Text>
      {children}
    </Form.Group>
  );
}

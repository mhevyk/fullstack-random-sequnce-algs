import {
  Spinner,
  Button as BSButton,
  ButtonProps as BSButtonProps,
} from "react-bootstrap";

type ButtonProps = BSButtonProps & {
  isLoading?: boolean;
};

export function Button({
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <BSButton disabled={isLoading || disabled} {...props}>
      {isLoading && <Spinner size="sm" />} {children}
    </BSButton>
  );
}

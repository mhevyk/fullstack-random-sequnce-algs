import { PropsWithChildren } from "react";
import TeX from "@matejmazur/react-katex";

export function MathText({ children }: PropsWithChildren) {
  return <TeX settings={{ output: "mathml" }}>{children}</TeX>;
}

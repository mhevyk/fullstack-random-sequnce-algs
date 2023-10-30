import TeX from "@matejmazur/react-katex";

type MathTextProps = {
  children: string;
};

const KATEX_SETTINGS = {
  output: "mathml",
  macros: { "*": "\\cdot" },
};

export function MathText({ children }: MathTextProps) {
  const block = children.includes("\\frac");

  return (
    <TeX
      settings={KATEX_SETTINGS}
      block={block}
      className={block ? "math-block" : "math-inline"}
    >
      {children}
    </TeX>
  );
}

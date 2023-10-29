import TeX from "@matejmazur/react-katex";

type MathTextProps = {
  children: string;
  options?: Record<string, any>;
};

export function MathText({ children }: MathTextProps) {
  const block = children.includes("\\frac");
  return (
    <TeX
      settings={{
        output: "mathml",
        macros: { " ": "\\:", "*": "\\cdot" },
        strict: "unicodeTextInMathMode",
      }}
      block={block}
      className={block ? "math-block" : undefined}
    >
      {children}
    </TeX>
  );
}

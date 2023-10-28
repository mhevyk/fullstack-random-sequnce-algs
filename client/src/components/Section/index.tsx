import { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren & {
  title: string;
};

export function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h3 className="mb-3">{title}</h3>
      {children}
    </section>
  );
}

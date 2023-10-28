export type Bit = 0 | 1;

export const algorithms = [
  { value: "fips186", label: "FIPS–186" },
  { value: "ansix917", label: "ANSI X9.17" },
  { value: "bbs", label: "BBS" },
] as const;
export type Algorithm = (typeof algorithms)[number]["value"];

export type Algorithm = "fips186";

export type Step = {
  description: string;
  value?: number;
};

export type GetAlgorithmStepsResponse = {
  totalPages: number;
  page: number;
  data: Step[];
};

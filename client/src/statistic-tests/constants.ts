export const STATISTIC_LIMIT = 1.82138636;

type Value = {
  type: "value";
  data: string | number;
};

type BitList = {
  type: "bitlist";
  data: number[];
};

type Table = {
  type: "table";
  data: {
    labels: [string, string];
    dataset: Record<number, number>;
  };
};

export type Step = {
  description: string;
  value: Value | Table | BitList;
};

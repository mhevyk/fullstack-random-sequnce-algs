import { Request } from "express";

export type Fips186QueryParams = {
  count: number;
  limit: number;
};

export type Fips186Request = Request<{}, {}, {}, Fips186QueryParams>;

export type Ansix917QueryParams = {
  count: number;
  limit: number;
  seed: string;
  key: string;
};

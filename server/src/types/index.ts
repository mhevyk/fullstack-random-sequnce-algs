import { Request } from "express";

export type Fips186QueryParams = {
  count: number;
  limit: number;
};

export type Fips186Request = Request<{}, {}, {}, Fips186QueryParams>;

export type Ansix917QueryParams = {
  count: number;
  seed: string;
  key: string;
};

export type Ansix917Request = Request<{}, {}, {}, Ansix917QueryParams>;

export type BBSQueryParams = {
  count: number;
};

export type BBSRequest = Request<{}, {}, {}, BBSQueryParams>;

export type Bit = 0 | 1;

import { Request } from "express";

// FIPS-186 types
type Fips186QueryParams = {
  count: string;
  limit: string;
};

export type Fips186Request = Request<{}, {}, {}, Fips186QueryParams>;

export type Fips186ServiceArguments = Omit<Fips186QueryParams, "count"> & {
  count: number;
};

// AnsiX917 types
type Ansix917QueryParams = {
  count: string;
  seed: string;
  key: string;
};

export type Ansix917Request = Request<{}, {}, {}, Ansix917QueryParams>;

export type Ansix917ServiceParams = Omit<Ansix917QueryParams, "count"> & {
  count: number;
};

// BBS types
type BBSQueryParams = {
  count: string;
};

export type BBSRequest = Request<{}, {}, {}, BBSQueryParams>;

export type BBSServiceParams = {
  count: number;
};

export type Bit = 0 | 1;

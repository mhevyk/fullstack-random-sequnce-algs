import { AxiosError } from "axios";
import { Bit } from "../types";

export type GetFips186RandomResponse = {
  count: string;
  limit: string;
  data: Bit[];
};

export type GetAnsix917Response = {
  count: string;
  seed: string;
  key: string;
  data: Bit[];
};

type ServerError = {
  message: string;
  status: string;
  errors?: Pick<Error, "message">[];
};

export type APIError = AxiosError<ServerError>;

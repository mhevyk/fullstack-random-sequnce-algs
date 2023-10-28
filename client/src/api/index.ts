import API from "./base";
import { Algorithm } from "../types";

export async function getRandomSequence<TData>(
  algorithm: Algorithm,
  params?: URLSearchParams
) {
  return API.get<TData>(`/random/${algorithm}`, { params }).then(
    response => response.data
  );
}

export async function getRandomBigInt(bits: number) {
  return API.get(`/random/bigint`, { params: { bits } }).then(
    response => response.data
  );
}

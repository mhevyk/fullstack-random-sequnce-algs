import API from "./base";
import { Algorithm, GetAlgorithmStepsResponse } from "./types";

export async function getAlgorithmSteps(algorithm: Algorithm, page: number) {
  return API.get<GetAlgorithmStepsResponse>(
    `/steps/${algorithm}?page=${page}`
  ).then(response => response.data);
}

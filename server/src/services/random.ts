import { Ansix917QueryParams, Fips186QueryParams } from "../types/index.js";
import { ansix917 } from "../utils/ansi-x9.17.js";
import { fips186 } from "../utils/fips186.js";

class RandomService {
  getFips186Random({ count, limit }: Fips186QueryParams) {
    return fips186(count, limit);
  }

  getAnsix917Random({ count, seed, key, limit }: Ansix917QueryParams) {
    return ansix917(seed, key, count, limit);
  }
}

export default new RandomService();

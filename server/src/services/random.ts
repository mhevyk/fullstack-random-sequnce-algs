import {
  Ansix917QueryParams,
  BBSQueryParams,
  Fips186QueryParams,
} from "../types/index.js";
import { ansix917 } from "../algorithms/ansi-x9.17.js";
import { bbs } from "../algorithms/bbs.js";
import { fips186 } from "../algorithms/fips186.js";

class RandomService {
  getFips186Random({ count, limit }: Fips186QueryParams) {
    return fips186(count, limit);
  }

  getAnsix917Random({ count, seed, key }: Ansix917QueryParams) {
    return ansix917(seed, key, count);
  }

  getBBSRandom({ count }: BBSQueryParams) {
    return bbs(count);
  }
}

export default new RandomService();

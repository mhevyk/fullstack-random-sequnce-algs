import { ansix917 } from "../algorithms/ansi-x9.17.js";
import { bbs } from "../algorithms/bbs.js";
import { fips186 } from "../algorithms/fips186.js";
import {
  Ansix917ServiceParams,
  BBSServiceParams,
  Fips186ServiceArguments,
} from "../types/index.js";

class RandomService {
  getFips186Random({ count, limit }: Fips186ServiceArguments) {
    return fips186(count, limit);
  }

  getAnsix917Random({ count, seed, key }: Ansix917ServiceParams) {
    return ansix917(seed, key, count);
  }

  getBBSRandom({ count }: BBSServiceParams) {
    return bbs(count);
  }
}

export default new RandomService();

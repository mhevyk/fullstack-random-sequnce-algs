import { Request, Response } from "express";
import randomService from "../services/random.js";
import { Random } from "../utils/random.js";
import { Ansix917Request, BBSRequest, Fips186Request } from "../types/index.js";
import { logRandomSequence } from "../utils/logRandomSequence.js";

class RandomController {
  async getFips186Random(req: Fips186Request, res: Response) {
    const count = Number(req.query.count);
    const limit = req.query.limit;

    const randomNumbers = randomService.getFips186Random({
      count,
      limit,
    });

    await logRandomSequence(randomNumbers);

    res.json({ count, limit, data: randomNumbers });
  }

  async getAnsix917Random(req: Ansix917Request, res: Response) {
    const count = Number(req.query.count);
    const seed = req.query.seed;
    const key = req.query.key;

    const randomNumbers = randomService.getAnsix917Random({
      count,
      seed,
      key,
    });

    await logRandomSequence(randomNumbers);

    res.json({ count, seed, key, data: randomNumbers });
  }

  async getBBSRandom(req: BBSRequest, res: Response) {
    const count = Number(req.query.count);

    const randomNumbers = randomService.getBBSRandom({ count });

    await logRandomSequence(randomNumbers);

    res.json({ count, data: randomNumbers });
  }

  getRandomBigInt(req: Request, res: Response) {
    const bits = req.query.bits;
    const bigInteger = Random.BigInt.Bits(Number(bits));
    res.json({ value: bigInteger });
  }
}

export default new RandomController();

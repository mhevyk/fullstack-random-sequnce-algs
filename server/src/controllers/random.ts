import { Request, Response } from "express";
import randomService from "../services/random.js";
import { Random } from "../utils/random.js";
import { Ansix917Request, BBSRequest, Fips186Request } from "../types/index.js";

class RandomController {
  // TODO: fix types and make sure they cast expectable
  getFips186Random(req: Fips186Request, res: Response) {
    const { count, limit } = req.query;
    const randomNumbers = randomService.getFips186Random({
      count: Number(count),
      limit,
    });

    res.json({ count, limit, data: randomNumbers });
  }

  // TODO: handle count and other query params better
  getAnsix917Random(req: Ansix917Request, res: Response) {
    const { count, seed, key } = req.query;

    const randomNumbers = randomService.getAnsix917Random({
      count: Number(count),
      seed,
      key,
    });

    res.json({ count, seed, key, data: randomNumbers });
  }

  getBBSRandom(req: BBSRequest, res: Response) {
    const { count } = req.query;

    const randomNumbers = randomService.getBBSRandom({ count: Number(count) });

    res.json({ count, data: randomNumbers });
  }

  getRandomBigInt(req: Request, res: Response) {
    const bits = req.query.bits;
    const bigInteger = Random.BigInt.Bits(Number(bits));
    res.json({ value: bigInteger });
  }
}

export default new RandomController();

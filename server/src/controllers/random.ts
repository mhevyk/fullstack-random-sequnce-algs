import { Request, Response } from "express";
import randomService from "../services/random.js";
import { Random } from "../utils/random.js";
import { Ansix917Request, BBSRequest, Fips186Request } from "../types/index.js";

class RandomController {
  getFips186Random(req: Fips186Request, res: Response) {
    const count = Number(req.query.count) || 1;
    const limit = Number(req.query.limit) || 1000;

    const randomNumbers = randomService.getFips186Random({ count, limit });

    res.json({ count, limit, data: randomNumbers });
  }

  getAnsix917Random(req: Ansix917Request, res: Response) {
    const count = Number(req.query.count) || 1;
    const limit = Number(req.query.limit) || 1000;
    const seed = req.query.seed?.toString() || Random.Hex.Bits(64);
    const key = req.query.key?.toString() || Random.Hex.Bits(192);

    const randomNumbers = randomService.getAnsix917Random({
      count,
      seed,
      key,
      limit,
    });

    res.json({ count, limit, seed, key, data: randomNumbers });
  }

  getBBSRandom(req: BBSRequest, res: Response) {
    const count = Number(req.query.count) || 1;

    const randomNumbers = randomService.getBBSRandom({ count });

    res.json({ count, data: randomNumbers });
  }
}

export default new RandomController();

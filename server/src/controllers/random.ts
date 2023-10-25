import { NextFunction, Request, Response } from "express";
import randomService from "../services/random.js";
import { Random } from "../utils/random.js";
import { Fips186Request } from "../types/index.js";
import { validationResult } from "express-validator";
import { APIError } from "../exception/APIError.js";

class RandomController {
  getFips186Random(req: Fips186Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(APIError.Validation(errors.array()));
    }

    const count = Number(req.query.count) || 1;
    const limit = Number(req.query.limit) || 1000;

    console.log(count, limit);
    const randomNumbers = randomService.getFips186Random({ count, limit });

    res.json({ count, limit, data: randomNumbers });
  }

  getAnsix917Random(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(APIError.Validation(errors.array()));
    }

    const count = Number(req.query.count) || 1;
    const limit = Number(req.query.limit) || 1000;
    const seed = req.query.seed?.toString() || Random.Hex({ bits: 64 });
    const key = req.query.key?.toString() || Random.Hex({ bits: 192 });

    const randomNumbers = randomService.getAnsix917Random({
      count,
      seed,
      key,
      limit,
    });

    res.json({ count, limit, seed, key, data: randomNumbers });
  }
}

export default new RandomController();

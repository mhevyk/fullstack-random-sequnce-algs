import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { APIError } from "../exception/APIError.js";

export default function validate<TRequest extends Request<{}, {}, {}, {}>>(
  req: TRequest,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(APIError.Validation(errors.array()));
  }

  return next();
}

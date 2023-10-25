import { Request, Response, NextFunction } from "express";
import { APIError } from "../exception/APIError.js";

export default function handleException(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      message: err.message,
      status: err.statusCode,
      ...(err.errors.length > 0
        ? { errors: err.errors.map(error => ({ message: error.msg })) }
        : {}),
    });
  }

  console.log(err);

  return res.status(500).json({ message: "Непередбачувана помилка" });
}

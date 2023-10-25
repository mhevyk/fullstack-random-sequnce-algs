import { query } from "express-validator";

export const validateLimit = query(
  "limit",
  "Значення limit має бути більшим за 1"
)
  .optional()
  .isInt({ min: 2 });

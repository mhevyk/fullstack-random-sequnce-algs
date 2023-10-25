import { query } from "express-validator";

export const validateCount = query(
  "count",
  "Значення count має бути цілим числом у межах [0, 1000]"
)
  .optional()
  .isInt({ min: 0, max: 1000 });

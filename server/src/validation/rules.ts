import { query } from "express-validator";

const rules = {
  count: query(
    "count",
    "Значення count має бути цілим числом у межах [0, 1000]"
  )
    .optional()
    .isInt({ min: 0, max: 1000 }),
  limit: query("limit", "Значення limit має бути більшим за 1")
    .optional()
    .isInt({ min: 2 }),
  hex: (field: string) => query(field).optional().isHexadecimal(),
};

export const fips186ValidationRules = [rules.count, rules.limit];
export const ansix917ValidationRules = [
  rules.count,
  rules.limit,
  rules.hex("seed"),
  rules.hex("key"),
];
export const bbsValidationRules = [rules.count];

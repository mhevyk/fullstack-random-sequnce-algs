import bigInt from "big-integer";
import { query } from "express-validator";

const rules = {
  count: query(
    "count",
    "Значення count має бути цілим числом у межах [1, 50000]"
  )
    .optional()
    .isInt({ min: 1, max: 50000 }),
  limit: query("limit", "Значення limit має бути більшим за 1")
    .optional()
    .custom(value => bigInt(value).greater(1)),
  bits: query(
    "bits",
    "Значення кількості біт має бути у межах [8, 1000] та бути кратним 8"
  )
    .isInt({
      min: 2,
      max: 1000,
    })
    .custom(value => value % 8 === 0),
  hex: (field: string) => query(field).optional().isHexadecimal(),
};

export const fips186ValidationRules = [rules.count, rules.limit];
export const ansix917ValidationRules = [
  rules.count,
  rules.hex("seed"),
  rules.hex("key"),
];
export const bbsValidationRules = [rules.count];
// TODO: fix duplicate error
export const bigIntValidationRules = [rules.bits];

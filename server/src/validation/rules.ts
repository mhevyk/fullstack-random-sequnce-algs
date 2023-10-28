import bigInt from "big-integer";
import { query } from "express-validator";
import { countBitsInBigInt } from "../utils/countBitsInBigInt.js";

const countRule = query(
  "count",
  "Значення count має бути цілим числом у межах [1, 50000]"
)
  .optional()
  .isInt({ min: 1, max: 50000 });

const nonNegativeIntRule = (field: string) =>
  query(field, `Значення ${field} має бути невід'ємним цілим числом`).isInt({
    min: 0,
  });

const bigIntegerByBitsRule = (field: string, bits: number) =>
  query(field, `Значення поля ${field} має бути ${bits}-бітовим числом`).custom(
    value => {
      const bigValue = bigInt(value);
      return countBitsInBigInt(bigValue) === bits;
    }
  );

const exactBitsToBytesRule = query(
  "bits",
  "Значення кількості біт має бути у межах [8, 1000] та бути кратним 8"
)
  .isInt({
    min: 2,
    max: 1000,
  })
  .custom(value => value % 8 === 0);

export const fips186ValidationRules = [
  countRule,
  nonNegativeIntRule("limit"),
  bigIntegerByBitsRule("limit", 160),
];

export const ansix917ValidationRules = [
  countRule,
  bigIntegerByBitsRule("seed", 64),
  bigIntegerByBitsRule("key", 128),
];

export const bbsValidationRules = [countRule];
export const bigIntValidationRules = [exactBitsToBytesRule];

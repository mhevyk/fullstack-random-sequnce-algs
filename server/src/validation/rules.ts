import bigInt from "big-integer";
import { query } from "express-validator";
import { countBitsInBigInt } from "../utils/countBitsInBigInt.js";

const countRule = query(
  "count",
  "Значення count має бути цілим числом у межах [1, 50000]"
)
  .default(1)
  .isInt({ min: 1, max: 50000 });

const nonNegativeIntRule = (field: string) =>
  query(field, `Значення ${field} має бути невід'ємним цілим числом`).isInt({
    min: 0,
  });

type BigIntegerByBitsRule = {
  field: string;
  bits: number;
  default?: string;
};

const bigIntegerByBitsRule = ({
  field,
  bits,
  default: defaultValue,
}: BigIntegerByBitsRule) =>
  query(field, `Значення поля ${field} має бути ${bits}-бітовим числом`)
    .default(defaultValue)
    .custom(value => {
      const bigValue = bigInt(value);
      return countBitsInBigInt(bigValue) === bits;
    });

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
  bigIntegerByBitsRule({
    field: "limit",
    bits: 160,
    default: "1391605785169562015414196052258036110133116476015",
  }),
];

export const ansix917ValidationRules = [
  countRule,
  bigIntegerByBitsRule({
    field: "seed",
    bits: 64,
    default: "12712645049748658104",
  }),
  bigIntegerByBitsRule({
    field: "key",
    bits: 128,
    default: "253019564733276754055855694968778029229",
  }),
];

export const bbsValidationRules = [countRule];
export const bigIntValidationRules = [exactBitsToBytesRule];

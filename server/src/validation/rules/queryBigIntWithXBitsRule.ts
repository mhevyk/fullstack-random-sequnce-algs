import bigInt from "big-integer";
import { query } from "express-validator";
import { countBitsInBigInt } from "../../utils/countBitsInBigInt.js";

type BigIntWithXBitsRuleOptions = {
  bits: number;
  default?: string;
};

export function queryBigIntWithXBitsRule(
  field: string,
  { bits, default: defaultValue }: BigIntWithXBitsRuleOptions
) {
  return query(field)
    .default(defaultValue)
    .isInt({ min: 0 })
    .withMessage(`Значення поля ${field} не може бути від'ємним`)
    .custom(value => {
      const bigValue = bigInt(value);
      return countBitsInBigInt(bigValue) === bits;
    })
    .withMessage(`Значення поля ${field} має бути ${bits}-бітним`);
}

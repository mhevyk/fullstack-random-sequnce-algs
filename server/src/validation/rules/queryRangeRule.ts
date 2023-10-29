import { query } from "express-validator";

type RangeRuleOptions = {
  min: number;
  max: number;
  default?: number;
};

export function queryRangeRule(
  field: string,
  { min, max, default: defaultValue }: RangeRuleOptions
) {
  return query(field)
    .default(defaultValue ?? min)
    .isInt({ min, max })
    .withMessage(`Значення поля ${field} має бути в межах [${min}, ${max}]`);
}

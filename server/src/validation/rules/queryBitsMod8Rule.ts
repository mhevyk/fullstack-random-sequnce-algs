import { query } from "express-validator";

export function queryBitsMod8(field: string) {
  return query(field)
    .exists()
    .withMessage(`Поле ${field} є обов'язковим`)
    .isInt({ min: 0 })
    .withMessage(`Значення поля ${field} має бути цілим невід'ємним числом`)
    .custom(value => Number(value) % 8 === 0)
    .withMessage(`Значення поля ${field} має бути кратним 8`);
}

import { query } from "express-validator";

export const validateHex = (field: string) =>
  query(field).optional().isHexadecimal();

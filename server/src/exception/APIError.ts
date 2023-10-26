import { ValidationError } from "express-validator";

export class APIError extends Error {
  public readonly statusCode: number;
  public readonly errors: ValidationError[];

  constructor(
    message = "Internal Server Error",
    status = 500,
    errors: ValidationError[] = []
  ) {
    super(message);
    this.statusCode = status;
    this.errors = errors;
  }

  static Validation(errors: ValidationError[]) {
    return new APIError("Помилка валідації", 400, errors);
  }
}

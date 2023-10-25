import { APIError } from "../exception/APIError.js";
export function validateRandomCountParam(req, res, next) {
    const count = parseInt(req.query.count) || 1;
    if (count < 0) {
        throw APIError.BadRequest("Кількість згенерованих чисел не може бути від'ємною");
    }
    if (count > 1000) {
        throw APIError.BadRequest("Кількість згенерованих чисел не може перевищувати 1000");
    }
    req.query.count = count.toString();
    next();
}
//# sourceMappingURL=validate-random-count.js.map
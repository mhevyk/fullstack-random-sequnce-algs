import { APIError } from "../exception/APIError.js";
export function validateLimitParam(req, res, next) {
    const limit = parseInt(req.query.limit) || Math.pow(10, 3);
    if (limit < 0) {
        throw APIError.BadRequest("Ліміт генерації не може бути від'ємним");
    }
    req.query.limit = limit.toString();
    next();
}
//# sourceMappingURL=validate-limit-middleware.js.map
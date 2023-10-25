export class APIError extends Error {
    constructor(message = "Internal server error", statusCode = 500) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
    static BadRequest(message) {
        return new APIError(message, 400);
    }
    static NotFound(message) {
        return new APIError(message, 404);
    }
}
//# sourceMappingURL=APIError.js.map
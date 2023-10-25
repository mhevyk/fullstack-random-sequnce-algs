import { APIError } from "../exception/APIError.js";
export default function handleException(err, req, res, next) {
    if (err instanceof APIError) {
        return res
            .status(err.statusCode)
            .json({ message: err.message, status: err.statusCode });
    }
    console.log(err);
    return res.status(500).json({ message: "Непередбачувана помилка" });
}
//# sourceMappingURL=exception-middleware.js.map
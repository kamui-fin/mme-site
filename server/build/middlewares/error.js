"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// import { logger } from "../utils"
const errorHandler = (err, req, res, next) => {
    const { httpCode, name, description } = err;
    console.error(err);
    if (httpCode)
        res.status(httpCode);
    res.send({
        ok: false,
        error: {
            name,
            description,
        },
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map
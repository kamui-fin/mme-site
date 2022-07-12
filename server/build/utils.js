"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.catchAsync = exports.logger = exports.ApiError = void 0;
const celebrate_1 = require("celebrate");
const http_status_1 = __importDefault(require("http-status"));
const winston_1 = __importDefault(require("winston"));
class BaseError extends Error {
    httpCode;
    constructor(description, httpCode) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
        this.httpCode = httpCode;
    }
}
class ApiError extends BaseError {
    constructor(description = "server encountered an error", httpCode = http_status_1.default.INTERNAL_SERVER) {
        super(description, httpCode);
    }
}
exports.ApiError = ApiError;
const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: "white",
        debug: "green",
        info: "green",
        warn: "yellow",
        error: "red",
        fatal: "red",
    },
};
const formatter = winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.splat(), winston_1.default.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""}`;
}));
const transport = new winston_1.default.transports.Console({
    format: formatter,
});
exports.logger = winston_1.default.createLogger({
    levels: customLevels.levels,
    transports: transport,
});
winston_1.default.addColors(customLevels.colors);
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
exports.catchAsync = catchAsync;
const validate = (schema) => (0, celebrate_1.celebrate)(schema, { abortEarly: false }, { mode: celebrate_1.Modes.FULL });
exports.validate = validate;
//# sourceMappingURL=utils.js.map
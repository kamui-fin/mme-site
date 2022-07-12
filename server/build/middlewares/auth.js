"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const http_status_1 = require("http-status");
const config_1 = require("../config");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.headers["Authorization"];
    if (!token) {
        throw new utils_1.ApiError("Token required", http_status_1.FORBIDDEN);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.TOKEN_KEY);
        req.user = decoded;
    }
    catch (err) {
        return res.status(http_status_1.UNAUTHORIZED).send("Invalid token");
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map
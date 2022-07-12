"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const celebrate_1 = require("celebrate");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const utils_1 = require("../utils");
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/register", auth_1.register, (0, utils_1.validate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        username: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    }),
}));
exports.authRouter.post("/login", auth_1.login, (0, utils_1.validate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    }),
}));
//# sourceMappingURL=auth.js.map
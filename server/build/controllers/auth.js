"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const argon2_1 = __importDefault(require("argon2"));
const http_status_1 = require("http-status");
const config_1 = require("../config");
const User_1 = require("../entity/User");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.register = (0, utils_1.catchAsync)(async (req, res) => {
    const { email, username, password } = req.body;
    const userRepository = config_1.AppDataSource.getRepository(User_1.User);
    const oldUser = await userRepository.findOneBy({ email });
    if (oldUser) {
        throw new utils_1.ApiError("User already exists", http_status_1.CONFLICT);
    }
    const hashed = await argon2_1.default.hash(password);
    const user = new User_1.User();
    user.email = email.toLowerCase();
    user.username = username;
    user.password = hashed;
    const token = jsonwebtoken_1.default.sign({ user_id: user.id, email }, config_1.TOKEN_KEY, {
        expiresIn: config_1.JWT_EXPIRE_TIME,
    });
    user.token = token;
    await userRepository.save(user);
    res.status(http_status_1.CREATED).json(user);
});
exports.login = (0, utils_1.catchAsync)(async (req, res) => {
    const { email, password } = req.body;
    const userRepository = config_1.AppDataSource.getRepository(User_1.User);
    const user = await userRepository.findOneBy({ email });
    if (user && (await argon2_1.default.verify(user.password, password))) {
        const token = jsonwebtoken_1.default.sign({ user_id: user.id, email }, config_1.TOKEN_KEY, {
            expiresIn: config_1.JWT_EXPIRE_TIME,
        });
        user.token = token;
        return res.status(http_status_1.OK).json(user);
    }
    throw new utils_1.ApiError("Invalid credentials", 400);
});
//# sourceMappingURL=auth.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = exports.AppDataSource = exports.JWT_EXPIRE_TIME = exports.STRAPI_URL = exports.STRIPE_API_KEY = exports.TOKEN_KEY = exports.POSTGRES_DB_NAME = exports.POSTGRES_PASSWORD = exports.POSTGRES_USERNAME = exports.POSTGRES_PORT = exports.POSTGRES_HOST = exports.FRONTEND_URI = exports.APP_PORT = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
_a = process.env, _b = _a.NODE_ENV, exports.NODE_ENV = _b === void 0 ? "development" : _b, _c = _a.APP_PORT, exports.APP_PORT = _c === void 0 ? 8000 : _c, _d = _a.FRONTEND_URI, exports.FRONTEND_URI = _d === void 0 ? "http://localhost:3000" : _d, _e = _a.POSTGRES_HOST, exports.POSTGRES_HOST = _e === void 0 ? "localhost" : _e, _f = _a.POSTGRES_PORT, exports.POSTGRES_PORT = _f === void 0 ? 5432 : _f, _g = _a.POSTGRES_USERNAME, exports.POSTGRES_USERNAME = _g === void 0 ? "postgres" : _g, _h = _a.POSTGRES_PASSWORD, exports.POSTGRES_PASSWORD = _h === void 0 ? "postgres" : _h, _j = _a.POSTGRES_DB_NAME, exports.POSTGRES_DB_NAME = _j === void 0 ? "mme" : _j, _k = _a.TOKEN_KEY, exports.TOKEN_KEY = _k === void 0 ? "shhhhh" : _k, exports.STRIPE_API_KEY = _a.STRIPE_API_KEY, _l = _a.STRAPI_URL, exports.STRAPI_URL = _l === void 0 ? "http://localhost:1337" : _l;
exports.JWT_EXPIRE_TIME = "365d";
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: exports.POSTGRES_HOST,
    port: typeof exports.POSTGRES_PORT === "string" ? Number.parseInt(exports.POSTGRES_PORT) : exports.POSTGRES_PORT,
    username: exports.POSTGRES_USERNAME,
    password: exports.POSTGRES_PASSWORD,
    database: exports.POSTGRES_DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User_1.User],
    subscribers: [],
    migrations: [],
});
exports.stripe = new stripe_1.default(exports.STRIPE_API_KEY, {
    apiVersion: '2020-08-27',
});
//# sourceMappingURL=config.js.map
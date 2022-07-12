"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const error_1 = require("./middlewares/error");
const celebrate_1 = require("celebrate");
const routes_1 = require("./routes");
const utils_1 = require("./utils");
require("reflect-metadata");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: config_1.FRONTEND_URI, credentials: true }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.use(routes_1.router);
app.use((0, celebrate_1.errors)());
app.use(error_1.errorHandler);
config_1.AppDataSource.initialize()
    .then(() => {
    app.listen(config_1.APP_PORT, () => {
        utils_1.logger.info(`Listening to port ${config_1.APP_PORT}`);
    });
})
    .catch((error) => console.log(error));
process.on("unhandledRejection", (reason) => {
    throw reason;
});
process.on("uncaughtException", (error) => {
    utils_1.logger.error(error);
});
//# sourceMappingURL=app.js.map
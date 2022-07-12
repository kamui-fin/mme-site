"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const payments_1 = require("../controllers/payments");
exports.paymentsRouter = express_1.default.Router();
exports.paymentsRouter.post("/create-checkout-intent", payments_1.createCheckoutIntent);
//# sourceMappingURL=payments.js.map
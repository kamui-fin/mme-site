"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutIntent = void 0;
const utils_1 = require("../utils");
const config_1 = require("../config");
const products_1 = require("../services/products");
exports.createCheckoutIntent = (0, utils_1.catchAsync)(async (req, res) => {
    const { items } = req.body;
    const intent = await config_1.stripe.paymentIntents.create({
        amount: await (0, products_1.calculateOrderAmount)(items),
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    res.send({
        clientSecret: intent.client_secret,
    });
});
//# sourceMappingURL=payments.js.map
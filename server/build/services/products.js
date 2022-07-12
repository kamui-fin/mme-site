"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateOrderAmount = exports.getPrice = exports.httpStrapi = exports.getStrapiURL = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const config_1 = require("../config");
const getStrapiURL = (path = "") => {
    return `${config_1.STRAPI_URL}${path}`;
};
exports.getStrapiURL = getStrapiURL;
const httpStrapi = async (path, urlParamsObject = {}, options = {}) => {
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    };
    const queryString = qs_1.default.stringify(urlParamsObject);
    const requestUrl = `${(0, exports.getStrapiURL)(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;
    const response = await (0, axios_1.default)(requestUrl, mergedOptions);
    if (response.status !== 200) {
        console.error(response.statusText);
        throw new Error(`An error occured please try again`);
    }
    return response.data;
};
exports.httpStrapi = httpStrapi;
const getPrice = async (itemId) => {
    const res = await (0, exports.httpStrapi)(`/products/${itemId}`);
    return res.data.attributes.price;
};
exports.getPrice = getPrice;
const calculateOrderAmount = async (items) => {
    let total = 0;
    for (let itemId of items) {
        total += await (0, exports.getPrice)(itemId);
    }
    return total;
};
exports.calculateOrderAmount = calculateOrderAmount;
//# sourceMappingURL=products.js.map
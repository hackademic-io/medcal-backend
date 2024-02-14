"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_app_exc_producer_1 = __importDefault(require("../models/init_app_exc_producer"));
function confirmAppRoutes({ msg, router_key }) {
    const data = {
        msg,
        confirm_type: router_key,
        router_key: 'confirm',
    };
    (0, init_app_exc_producer_1.default)(data);
}
exports.default = confirmAppRoutes;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
require('dotenv').config();
function sendMessageToInitAppExc({ confirm_type, msg, router_key }) {
    return __awaiter(this, void 0, void 0, function* () {
        process.env.RABBITMQ_URL && callback_api_1.default.connect(process.env.RABBITMQ_URL, function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                const exchange = process.env.EXCHANGE_NAME;
                exchange && channel.assertExchange(exchange, 'direct', { durable: false });
                const new_msg = `Dear patient! Your ${msg} has been successfully ${confirm_type}ed!`;
                exchange && channel.publish(exchange, router_key, Buffer.from(new_msg));
            });
            setTimeout(function () {
                connection.close();
            }, 500);
        });
    });
}
exports.default = sendMessageToInitAppExc;

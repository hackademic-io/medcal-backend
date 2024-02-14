"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const init_app_exc_receiver_js_1 = __importDefault(require("./models/init_app_exc_receiver.js"));
const appointmentActionEmitter_js_1 = __importDefault(require("./utils/appointmentActionEmitter.js"));
const init_app_exc_producer_js_1 = __importDefault(require("./models/init_app_exc_producer.js"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.APPOINTMENT_SERVICE_PORT && parseInt(process.env.APPOINTMENT_SERVICE_PORT) || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`);
});
(0, init_app_exc_receiver_js_1.default)();
appointmentActionEmitter_js_1.default.on('appointmentAction', message => (0, init_app_exc_producer_js_1.default)(message));

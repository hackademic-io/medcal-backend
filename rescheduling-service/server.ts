import express from "express";
import cors from "cors";
import { consumeAppointmentQueue } from "./src/services/appointmentQueueConsumer";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT =
  (process.env.RESCHEDULING_SERVICE_PORT &&
    parseInt(process.env.RESCHEDULING_SERVICE_PORT)) ||
  3002;
consumeAppointmentQueue();

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
